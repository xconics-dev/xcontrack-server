import { z } from "../index.js";
import {
  commonQueryParamsZodSchema,
  extraFields,
  uuidZodSchemaGen,
} from "../common/index.js";

/* ================= ENUMS ================= */

export const ignitionStatusZodSchema = z.enum(["ON", "OFF"], {
  error: "Please enter a valid ignition status",
});

export const tamperStatusZodSchema = z.enum(["NORMAL", "TAMPER"], {
  error: "Please enter a valid tamper status",
});

export const powerStatusZodSchema = z.enum(["EXTERNAL", "BATTERY"], {
  error: "Please enter a valid power status",
});

export const trackingDataSourceZodSchema = z.enum(["MQTT", "TCP", "HTTP"], {
  error: "Please enter a valid tracking data source",
});

export const latitudeSchema = z
  .string()
  .trim()
  .regex(/^\d+(\.\d+)?[NS]$/, "Invalid latitude format")
  .transform((val) => {
    const direction = val.slice(-1);
    const numeric = Number(val.slice(0, -1));

    return direction === "S" ? -numeric : numeric;
  })
  .refine((v) => v >= -90 && v <= 90, "Latitude out of range");

export const longitudeSchema = z
  .string()
  .trim()
  .regex(/^\d+(\.\d+)?[EW]$/, "Invalid longitude format")
  .transform((val) => {
    const direction = val.slice(-1);
    const numeric = Number(val.slice(0, -1));

    return direction === "W" ? -numeric : numeric;
  })
  .refine((v) => v >= -180 && v <= 180, "Longitude out of range");

/* ================= CREATE ================= */

export const deviceTrackingZodSchema = z.object({
  deviceId: uuidZodSchemaGen("device id"),

  vehicleNumber: z
    .string({ error: "Please enter vehicle number" })
    .trim()
    .min(1, { error: "Please enter vehicle number" }),

  trackingTimestamp: z.coerce.date({
    error: "Please enter tracking timestamp",
  }),

  latitude: latitudeSchema,
  longitude: longitudeSchema,
  altitude: z.coerce.number({ error: "Please enter altitude" }).optional(),

  speed: z.coerce.number({ error: "Please enter speed" }).optional(),
  heading: z.coerce.number({ error: "Please enter heading" }).optional(),

  gsmSignalStrength: z.coerce
    .number({ error: "Please enter GSM signal strength" })
    .optional(),

  satelliteCount: z.coerce
    .number({ error: "Please enter satellite count" })
    .optional(),

  batteryVoltage: z.coerce
    .number({ error: "Please enter battery voltage" })
    .optional(),

  cog: z.coerce.number({ error: "Please enter COG" }).optional(),
  csq: z.coerce.number({ error: "Please enter CSG" }).optional(),

  hdop: z.coerce.number({ error: "Please enter HDOP" }).optional(),
  pdop: z.coerce.number({ error: "Please enter PDOP" }).optional(),

  ignitionStatus: ignitionStatusZodSchema.optional(),
  tamperStatus: tamperStatusZodSchema.optional(),
  powerStatus: powerStatusZodSchema.optional(),

  theftAlert: z.boolean({ error: "Please enter theft alert flag" }).optional(),
  tamperAlert: z
    .boolean({ error: "Please enter tamper alert flag" })
    .optional(),
  lowBatteryAlert: z
    .boolean({
      error: "Please enter low battery alert flag",
    })
    .optional(),

  dataSource: trackingDataSourceZodSchema.optional(),

  isValid: z.boolean({ error: "Please enter validity flag" }).optional(),

  processedAt: z.coerce
    .date({ error: "Please enter processed time" })
    .optional(),
});

/* ================= UPDATE ================= */

export const deviceTrackingUpdateZodSchema = deviceTrackingZodSchema.partial();

/* ================= TYPES ================= */

export type DeviceTrackingZodType = z.infer<typeof deviceTrackingZodSchema>;

export type DeviceTrackingUpdateZodType = z.infer<
  typeof deviceTrackingUpdateZodSchema
>;

/* ================= RESPONSE ================= */

export const deviceTrackingResponseZodSchema = deviceTrackingZodSchema.extend({
  id: uuidZodSchemaGen("id"),
  ...extraFields,
});

export const deviceTrackingQueryZodSchema = commonQueryParamsZodSchema
  .omit({ search: true })
  .safeExtend({
    installationRequisitionId: uuidZodSchemaGen(
      "installationRequisitionId id"
    ).optional(),
  });
