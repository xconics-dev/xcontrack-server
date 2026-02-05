import XLSX from "xlsx";
import prisma from "../models/index.js";
import { installationRequisitionZodSchema } from "../validators/installationRequisition/index.js";
import installationRequisitionDb from "../models/installationRequisition/index.js";
import aggregatorDb from "../models/aggregator/index.js";

function parseDDMMYYYY(str: string) {
  const [dd, mm, yyyy] = str.split("-").map(Number);
  return new Date(yyyy, mm - 1, dd); // JS months are 0-based
}

function setDate(date: string) {
  if (date.trim().length === 0) return null;

  const returnDate = new Date(parseDDMMYYYY(date));

  return returnDate.toISOString();
}
export const preferredInstalltionDate = (tatHours: number) =>
  new Date(Date.now() + 1000 * 60 * 60 * (tatHours || 48));

export const insertFileDetailstoDb = async (buff: any) => {
  try {
    const workbook = XLSX.read(buff, { type: "buffer", cellDates: true });
    const allSheetNames = workbook.SheetNames;

    let allRows: any[] = [];

    for (const sheetName of allSheetNames) {
      const sheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(sheet, {
        defval: null,
        raw: false,
      }); // defval preserves empty cells

      const branches = await Promise.all(
        rows.map(async (item: any) => {
          return await prisma.lenderBranch.findUnique({
            where: {
              branchCode: item.branchCode,
            },
            select: {
              id: true,
              lenderId: true,
            },
          });
        })
      );

      const mappedRows = rows
        .map((item: any, i: number) => {
          return branches[i]
            ? installationRequisitionZodSchema.parse({
                ...item,
                lenderId: branches[i].lenderId,
                branchId: branches[i].id,
                branchCode: undefined,
              })
            : null;
        })
        .filter((item) => {
          return item !== null;
        });

      allRows = allRows.concat(mappedRows);
    }

    const installationRequisitions =
      await prisma.installationRequisition.createManyAndReturn({
        data: allRows,
        select: {
          id: true,
          tatHours: true,
        },
      });

    const aggregator = await aggregatorDb.findFirst();

    await Promise.all(
      installationRequisitions.map(async (item) => {
        const date = preferredInstalltionDate(item.tatHours);
        await installationRequisitionDb.update(item.id, {
          assignedAggregatorId: aggregator.id,
          quantity: 1,
          preferredInstallationDate: date,
          installationFinishTimeAssigned: date,
        });
      })
    );
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
