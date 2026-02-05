import prisma from "../index.js";
import Config from "../../config/index.js";
import {
  WarehousePincodeMappingUpdateZodType,
  WarehousePincodeMappingZodType,
} from "../../validators/warehousePincodeMapping/index.js";

const warehousePincodeMappingDb = {
  create: async (
    warehousePincodeMappingInfo: WarehousePincodeMappingZodType
  ) => {
    try {
      const warehousePincodeMapping =
        await prisma.warehousePincodeMapping.create({
          data: warehousePincodeMappingInfo,
        });
      return warehousePincodeMapping;
    } catch (error) {
      throw error;
    }
  },
  read: async (warehousePincodeMappingId: string) => {
    try {
      const warehousePincodeMapping =
        await prisma.warehousePincodeMapping.findUniqueOrThrow({
          where: { id: warehousePincodeMappingId },
        });

      return warehousePincodeMapping;
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
      const warehousePincodeMapping =
        await prisma.warehousePincodeMapping.findMany({
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

      const maxCount = await prisma.warehousePincodeMapping.count({
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
        warehousePincodeMapping,
        maxPage: Math.ceil(maxCount / limit),
      };
    } catch (error) {
      throw error;
    }
  },
  update: async (
    warehousePincodeMappingId: string,
    warehousePincodeMappingInfo: WarehousePincodeMappingUpdateZodType
  ) => {
    try {
      const warehousePincodeMapping =
        await prisma.warehousePincodeMapping.update({
          where: {
            id: warehousePincodeMappingId,
          },
          data: warehousePincodeMappingInfo,
        });

      return warehousePincodeMapping;
    } catch (error) {
      throw error;
    }
  },
  delete: async (warehousePincodeMappingId: string) => {
    try {
      const warehousePincodeMapping =
        await prisma.warehousePincodeMapping.delete({
          where: {
            id: warehousePincodeMappingId,
          },
        });
      return warehousePincodeMapping;
    } catch (error) {
      throw error;
    }
  },
};

export default warehousePincodeMappingDb;
