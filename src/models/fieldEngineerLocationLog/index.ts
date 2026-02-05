import prisma from "../index.js";
import Config from "../../config/index.js";
import { FieldEngineerLocationLogZodType } from "../../validators/fieldEngineerLocationLog/index.js";

const fieldEngineerLocationLogDb = {
  create: async (
    fieldEngineerLocationLogInfo: FieldEngineerLocationLogZodType
  ) => {
    try {
      const fieldEngineerLocationLog =
        await prisma.fieldEngineerLocationLog.create({
          data: fieldEngineerLocationLogInfo,
        });
      return fieldEngineerLocationLog;
    } catch (error) {
      throw error;
    }
  },
  list: async (
    offset: number = 0,
    limit: number = Config.PAGE_ITEM_COUNT,
    fieldEngineerId: string
  ) => {
    try {
      const fieldEngineerLocationLog =
        await prisma.fieldEngineerLocationLog.findMany({
          where: {
            fieldEngineerId,
          },
          orderBy: { timestamp: "desc" },
          skip: offset,
          take: limit,
        });

      const maxCount = await prisma.fieldEngineerLocationLog.count({
        where: {
          fieldEngineerId,
        },
      });

      return { fieldEngineerLocationLog, maxPage: Math.ceil(maxCount / limit) };
    } catch (error) {
      throw error;
    }
  },
  delete: async (fieldEngineerLocationLogId: string) => {
    try {
      const fieldEngineerLocationLog =
        await prisma.fieldEngineerLocationLog.delete({
          where: {
            id: fieldEngineerLocationLogId,
          },
        });
      return fieldEngineerLocationLog;
    } catch (error) {
      throw error;
    }
  },
};

export default fieldEngineerLocationLogDb;
