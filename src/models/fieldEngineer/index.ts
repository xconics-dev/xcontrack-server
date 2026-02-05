import prisma from "../index.js";
import Config from "../../config/index.js";
import {
  fieldEngineerQueryZodSchema,
  FieldEngineerUpdateZodType,
  FieldEngineerZodType,
} from "../../validators/fieldEngineer/index.js";
import z from "zod";

const fieldEngineerDb = {
  create: async (fieldEngineerInfo: FieldEngineerZodType) => {
    try {
      const fieldEngineer = await prisma.fieldEngineer.create({
        data: fieldEngineerInfo,
      });
      return fieldEngineer;
    } catch (error) {
      throw error;
    }
  },
  read: async (fieldEngineerId: string, aggregatorId?: string) => {
    try {
      const fieldEngineer = await prisma.fieldEngineer.findUniqueOrThrow({
        where: { id: fieldEngineerId, aggregatorId },
        include: {
          pincodeMappings: {
            select: {
              mappingPincode: true,
            },
          },
        },
      });

      return fieldEngineer;
    } catch (error) {
      throw error;
    }
  },
  list: async (
    search?: string,
    offset: number = 0,
    limit: number = Config.PAGE_ITEM_COUNT,
    aggregatorId?: string | null,
    employmentType?: z.infer<
      typeof fieldEngineerQueryZodSchema.shape.employmentType
    >
  ) => {
    try {
      const fieldEngineer = await prisma.fieldEngineer.findMany({
        where: {
          OR: [
            {
              engineerName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              emailId: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              mobileNo: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
          aggregatorId,
          employmentType: Array.isArray(employmentType)
            ? { in: employmentType }
            : employmentType,
        },
        skip: offset,
        take: limit,
        include: {
          pincodeMappings: {
            select: {
              mappingPincode: true,
            },
          },
        },
      });

      const maxCount = await prisma.fieldEngineer.count({
        where: {
          OR: [
            {
              engineerName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              emailId: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              mobileNo: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
          aggregatorId,
          employmentType: Array.isArray(employmentType)
            ? { in: employmentType }
            : employmentType,
        },
      });

      return { fieldEngineer, maxPage: Math.ceil(maxCount / limit) };
    } catch (error) {
      throw error;
    }
  },
  update: async (
    fieldEngineerId: string,
    fieldEngineerInfo: FieldEngineerUpdateZodType,
    aggregatorId?: string
  ) => {
    try {
      const fieldEngineer = await prisma.fieldEngineer.update({
        where: {
          id: fieldEngineerId,
          aggregatorId,
        },
        data: fieldEngineerInfo,
      });

      return fieldEngineer;
    } catch (error) {
      throw error;
    }
  },
  delete: async (fieldEngineerId: string) => {
    try {
      const fieldEngineer = await prisma.fieldEngineer.delete({
        where: {
          id: fieldEngineerId,
        },
      });
      return fieldEngineer;
    } catch (error) {
      throw error;
    }
  },
};

export default fieldEngineerDb;
