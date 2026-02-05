import prisma from "../index.js";
import Config from "../../config/index.js";
import {
  warehouseQueryZodSchema,
  WarehouseUpdateZodType,
  WarehouseZodType,
} from "../../validators/warehouse/index.js";
import z from "zod";

const warehouseDb = {
  create: async (warehouseInfo: WarehouseZodType) => {
    try {
      const warehouse = await prisma.warehouse.create({
        data: warehouseInfo,
      });
      return warehouse;
    } catch (error) {
      throw error;
    }
  },
  read: async (warehouseId: string) => {
    try {
      const warehouse = await prisma.warehouse.findUniqueOrThrow({
        where: { id: warehouseId },
      });

      return warehouse;
    } catch (error) {
      throw error;
    }
  },
  list: async (
    search?: string,
    offset: number = 0,
    limit: number = Config.PAGE_ITEM_COUNT,
    aggregatorId?: string | null,
    warehouseOwnerType?: z.infer<
      typeof warehouseQueryZodSchema.shape.warehouseOwnerType
    >,
    warehouseType?: z.infer<typeof warehouseQueryZodSchema.shape.warehouseType>
  ) => {
    try {
      const warehouse = await prisma.warehouse.findMany({
        where: {
          OR: [
            {
              warehouseName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              address: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
          aggregatorId,
          ownerType: Array.isArray(warehouseOwnerType)
            ? { in: warehouseOwnerType }
            : warehouseOwnerType,
          warehouseType: Array.isArray(warehouseType)
            ? { in: warehouseType }
            : warehouseType,
        },
        skip: offset,
        take: limit,
      });

      const maxCount = await prisma.warehouse.count({
        where: {
          OR: [
            {
              warehouseName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              address: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
          aggregatorId,
          ownerType: Array.isArray(warehouseOwnerType)
            ? { in: warehouseOwnerType }
            : warehouseOwnerType,
          warehouseType: Array.isArray(warehouseType)
            ? { in: warehouseType }
            : warehouseType,
        },
      });

      return { warehouse, maxPage: Math.ceil(maxCount / limit) };
    } catch (error) {
      throw error;
    }
  },
  update: async (
    warehouseId: string,
    warehouseInfo: WarehouseUpdateZodType
  ) => {
    try {
      const warehouse = await prisma.warehouse.update({
        where: {
          id: warehouseId,
        },
        data: warehouseInfo,
      });

      return warehouse;
    } catch (error) {
      throw error;
    }
  },
  delete: async (warehouseId: string) => {
    try {
      const warehouse = await prisma.warehouse.delete({
        where: {
          id: warehouseId,
        },
      });
      return warehouse;
    } catch (error) {
      throw error;
    }
  },
};

export default warehouseDb;
