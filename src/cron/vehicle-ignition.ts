import cron from "node-cron";
import prisma from "../models/index.js";

// ─── CONFIG ─────────────────────────────────────────────────────────────────
const MINIMUM_RECORD_DURATION_MS = 3 * 60 * 60 * 1000; // 3 hours
const MINIMUM_RECORD_DURATION_MINS = MINIMUM_RECORD_DURATION_MS / 1000 / 60; // 180 mins
const CRON_SCHEDULE = "*/5 * * * *"; // every 5 minutes

// ─── TYPES ──────────────────────────────────────────────────────────────────
interface LatestPacket {
  imei: string;
  jerk_status: string | null;
  time_stamp_server: Date | null;
}

// ─── HELPERS ────────────────────────────────────────────────────────────────

function durationMinutes(start: Date, end: Date): number {
  return (end.getTime() - start.getTime()) / 1000 / 60;
}

function isJerkOff(jerk_status: string | null | undefined): boolean {
  return jerk_status === "0";
}

function isJerkOn(jerk_status: string | null | undefined): boolean {
  return jerk_status === "1";
}

// ─── CORE SYNC LOGIC ────────────────────────────────────────────────────────

export async function syncJerkIgnitionRecords(): Promise<void> {
  const now = new Date();
  console.log("[JERK-CRON] 🔄 Starting jerk/ignition-off sync...");

  const latestPerImei: LatestPacket[] = await prisma.$queryRaw`
    SELECT DISTINCT ON (imei)
      imei,
      jerk_status,
      time_stamp_server
    FROM "DataPackets"
    WHERE imei IS NOT NULL
    ORDER BY imei, time_stamp_server DESC
  `;

  console.log(`[JERK-CRON] 📊 Found ${latestPerImei.length} active IMEIs`);

  for (const packet of latestPerImei) {
    const { imei, jerk_status, time_stamp_server } = packet;

    if (!imei) continue;

    try {
      // ── Guard: only process IMEIs linked to a vehicle with a proper vehicleNo ──
      const vehicleInfo = await prisma.installationRequisition.findFirst({
        where: {
          device: { imei },
          vehicleNo: { not: "" },
        },
        select: { vehicleNo: true },
      });

      if (!vehicleInfo?.vehicleNo) {
        console.log(`[JERK-CRON] ⏭️  Skipping IMEI: ${imei} — no linked vehicleNo`);
        continue;
      }

      const vehicleNo = vehicleInfo.vehicleNo;

      // ── FIX: Only look for an "open" record — one where jerk is still OFF.
      // An open record is identified by updatedAt being recent (within last 10 min)
      // OR ignitionOffDuration being 0 (just created). We use a dedicated isOpen
      // flag approach: find the most recent record that has NOT been finalized.
      //
      // Since there's no explicit status field, we determine "open" vs "closed" by:
      // - If jerk is currently OFF → the most recent record for this IMEI is open
      //   (we are still in the off-period that started at createdAt)
      // - If jerk is currently ON → the most recent record (if any) needs finalizing
      //
      // CRITICAL FIX: We must ensure we only ever have ONE open record per IMEI.
      // Use upsert-style logic: if jerk is OFF, find the latest record created
      // while jerk was off (i.e. its updatedAt is recent, meaning it was updated
      // this cycle or last cycle). The safest heuristic: the latest record whose
      // updatedAt is within the last (CRON_INTERVAL + buffer) minutes.
      //
      // Simplest reliable approach that matches this cron's 5-min interval:
      // "Open" = latest record updated within last 15 minutes (3x cron interval).
      const OPEN_RECORD_STALENESS_MS = 15 * 60 * 1000; // 15 minutes
      const stalenessCutoff = new Date(now.getTime() - OPEN_RECORD_STALENESS_MS);

      const openRecord = await prisma.deviceIgnitionOffRecord.findFirst({
        where: {
          imei,
          updatedAt: { gte: stalenessCutoff }, // was updated recently → still open
        },
        orderBy: { createdAt: "desc" },
      });

      // Also get the absolute latest record (for finalizing when jerk turns ON)
      const latestRecord = await prisma.deviceIgnitionOffRecord.findFirst({
        where: { imei },
        orderBy: { createdAt: "desc" },
      });

      // ── CASE A: Jerk is currently OFF ─────────────────────────────────────
      if (isJerkOff(jerk_status)) {
        if (!openRecord) {
          // No active open record → jerk just turned OFF, create a new one
          await prisma.deviceIgnitionOffRecord.create({
            data: {
              imei,
              vehicleNo,
              ignitionOffDuration: 0,
              createdAt: time_stamp_server ?? now,
              updatedAt: now,
            },
          });
          console.log(
            `[JERK-CRON] ➕ Created ignition-off record | IMEI: ${imei} | Vehicle: ${vehicleNo}`
          );
        } else {
          // Open record exists → jerk still OFF, update duration
          const durationMins = durationMinutes(openRecord.createdAt, now);
          await prisma.deviceIgnitionOffRecord.update({
            where: { id: openRecord.id },
            data: { ignitionOffDuration: durationMins, updatedAt: now },
          });
          console.log(
            `[JERK-CRON] 🔁 Updated record | IMEI: ${imei} | Vehicle: ${vehicleNo} | Duration: ${durationMins.toFixed(2)} min`
          );
        }
      }

      // ── CASE B: Jerk is currently ON ──────────────────────────────────────
      else if (isJerkOn(jerk_status)) {
        // Use latestRecord here (not openRecord) — the record to finalize may have
        // gone "stale" if the cron missed a cycle or restarted.
        // We only finalize if it hasn't been finalized yet: check if its
        // ignitionOffDuration is still actively growing (updatedAt is recent enough
        // relative to NOW vs a finalized record that would stop updating).
        //
        // Reliable rule: finalize the latest record IF its updatedAt was within
        // the last (CRON_INTERVAL * 4) window — meaning it was alive recently.
        const FINALIZE_STALENESS_MS = 20 * 60 * 1000; // 20 minutes
        const finalizeCutoff = new Date(now.getTime() - FINALIZE_STALENESS_MS);

        const recordToFinalize = latestRecord && latestRecord.updatedAt && latestRecord.updatedAt >= finalizeCutoff
          ? latestRecord
          : null;

        if (recordToFinalize) {
          const durationMs = now.getTime() - recordToFinalize.createdAt.getTime();
          const durationMins = durationMs / 1000 / 60;

          if (durationMs < MINIMUM_RECORD_DURATION_MS) {
            // Too short → delete (noise / micro-stop)
            await prisma.deviceIgnitionOffRecord.delete({
              where: { id: recordToFinalize.id },
            });
            console.log(
              `[JERK-CRON] 🗑️  Deleted short record | IMEI: ${imei} | Vehicle: ${vehicleNo} | ` +
              `Duration: ${durationMins.toFixed(2)} min < threshold ${MINIMUM_RECORD_DURATION_MINS} min`
            );
          } else {
            // Meaningful stop duration → finalize with correct duration & timestamp
            await prisma.deviceIgnitionOffRecord.update({
              where: { id: recordToFinalize.id },
              data: {
                ignitionOffDuration: durationMins,
                updatedAt: now,
              },
            });
            console.log(
              `[JERK-CRON] ✅ Finalized record | IMEI: ${imei} | Vehicle: ${vehicleNo} | Duration: ${durationMins.toFixed(2)} min`
            );
          }
        }
        // Jerk ON + no recent record to finalize → nothing to do
      }
    } catch (err) {
      console.error(`[JERK-CRON] ❌ Error processing IMEI: ${imei}`, err);
    }
  }

  console.log("[JERK-CRON] ✅ Jerk/ignition-off sync complete.");
}

// ─── SCHEDULED CRON ─────────────────────────────────────────────────────────

export const scheduleJerkIgnitionSync = () => {
  const task = cron.schedule(
    CRON_SCHEDULE,
    async () => {
      try {
        await syncJerkIgnitionRecords();
      } catch (err) {
        console.error("[JERK-CRON] ❌ Unhandled error in cron task:", err);
      }
    },
    { timezone: "Asia/Kolkata" }
  );

  console.log(
    `[JERK-CRON] ✅ Scheduled | Interval: ${CRON_SCHEDULE} | Min duration: ${MINIMUM_RECORD_DURATION_MINS} min (${MINIMUM_RECORD_DURATION_MS / 3600000}h)`
  );

  return task;
};

// ─── MANUAL TRIGGER ──────────────────────────────────────────────────────────

export const syncJerkIgnitionManually = async () => {
  console.log("[JERK-MANUAL] 🔄 Manual sync triggered...");
  await syncJerkIgnitionRecords();
  console.log("[JERK-MANUAL] ✅ Done.");
};