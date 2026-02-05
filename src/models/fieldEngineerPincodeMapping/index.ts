import prisma from "../index.js";
import Config from "../../config/index.js";
import {
  FieldEngineerPincodeMappingUpdateZodType,
  FieldEngineerPincodeMappingZodType,
} from "../../validators/fieldEngineerPincodeMapping/index.js";

const fieldEngineerPincodeMappingDb = {
  create: async (
    fieldEngineerPincodeMappingInfo: FieldEngineerPincodeMappingZodType
  ) => {
    try {
      const fieldEngineerPincodeMapping =
        await prisma.fieldEngineerPincodeMapping.create({
          data: fieldEngineerPincodeMappingInfo,
        });
      return fieldEngineerPincodeMapping;
    } catch (error) {
      throw error;
    }
  },
  read: async (fieldEngineerPincodeMappingId: string) => {
    try {
      const fieldEngineerPincodeMapping =
        await prisma.fieldEngineerPincodeMapping.findUniqueOrThrow({
          where: { id: fieldEngineerPincodeMappingId },
        });

      return fieldEngineerPincodeMapping;
    } catch (error) {
      throw error;
    }
  },
  list: async (
    search?: string,
    offset: number = 0,
    limit: number = Config.PAGE_ITEM_COUNT
  ) => {
    try {
      const fieldEngineerPincodeMapping =
        await prisma.fieldEngineerPincodeMapping.findMany({
          where: {
            OR: [
              {
                mappingPincode: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                district: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                state: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          },
          skip: offset,
          take: limit,
        });

      const maxCount = await prisma.fieldEngineerPincodeMapping.count({
        where: {
          OR: [
            {
              mappingPincode: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              district: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              state: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        },
      });

      return {
        fieldEngineerPincodeMapping,
        maxPage: Math.ceil(maxCount / limit),
      };
    } catch (error) {
      throw error;
    }
  },
  update: async (
    fieldEngineerPincodeMappingId: string,
    fieldEngineerPincodeMappingInfo: FieldEngineerPincodeMappingUpdateZodType
  ) => {
    try {
      const fieldEngineerPincodeMapping =
        await prisma.fieldEngineerPincodeMapping.update({
          where: {
            id: fieldEngineerPincodeMappingId,
          },
          data: fieldEngineerPincodeMappingInfo,
        });

      return fieldEngineerPincodeMapping;
    } catch (error) {
      throw error;
    }
  },
  delete: async (fieldEngineerPincodeMappingId: string) => {
    try {
      const fieldEngineerPincodeMapping =
        await prisma.fieldEngineerPincodeMapping.delete({
          where: {
            id: fieldEngineerPincodeMappingId,
          },
        });
      return fieldEngineerPincodeMapping;
    } catch (error) {
      throw error;
    }
  },
  engineerMappings: async (engineerId: string) => {
    try {
      const fieldEngineerPincodeMappings =
        await prisma.fieldEngineerPincodeMapping.findMany({
          where: {
            fieldEngineerId: engineerId,
          },
        });
      return fieldEngineerPincodeMappings;
    } catch (error) {
      throw error;
    }
  },
};

export default fieldEngineerPincodeMappingDb;
