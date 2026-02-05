import prisma from "../index.js";
import Config from "../../config/index.js";
import {
  DeviceUpdateZodType,
  DeviceZodSchema,
  DeviceZodType,
} from "../../validators/device/index.js";
import { deviceMovementInclude } from "../deviceMovement/index.js";
import z from "zod";

const deviceDb = {
  create: async (deviceInfo: DeviceZodType) => {
    try {
      const device = await prisma.device.create({
        data: deviceInfo,
      });
      return device;
    } catch (error) {
      throw error;
    }
  },
  read: async (deviceId: string) => {
    try {
      const device = await prisma.device.findUniqueOrThrow({
        where: { id: deviceId },
        include: {
          productionWarehouse: {
            select: {
              warehouseCode: true,
              address: true,
              latitude: true,
              longitude: true,
            },
          },
          deviceMovements: {
            where: {
              movementStatus: "RECEIVED",
            },
            skip: 0,
            take: 1,
            orderBy: { receivedAt: "desc" },
            include: deviceMovementInclude,
          },
        },
      });

      return device;
    } catch (error) {
      throw error;
    }
  },
  list: async (
    search?: string,
    offset: number = 0,
    limit: number = Config.PAGE_ITEM_COUNT,
    fieldEngineerId?: string,
    locationType?: z.infer<typeof DeviceZodSchema.shape.locationType>
  ) => {
    try {
      const device = await prisma.device.findMany({
        where: {
          locationType,
          OR: [
            {
              imei: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              qr: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
          AND: fieldEngineerId
            ? [
                {
                  locationType: "FIELD_ENGINEER",
                },
                {
                  deviceMovements: {
                    some: {
                      toEntityFieldEngineerId: fieldEngineerId,
                    },
                    none: {
                      fromEntityFieldEngineerId: fieldEngineerId,
                    },
                  },
                },
              ]
            : undefined,
        },
        skip: offset,
        take: limit,
      });

      const maxCount = await prisma.device.count({
        where: {
          locationType,
          OR: [
            {
              imei: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              qr: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
          AND: fieldEngineerId
            ? [
                {
                  locationType: "FIELD_ENGINEER",
                },
                {
                  deviceMovements: {
                    some: {
                      toEntityFieldEngineerId: fieldEngineerId,
                    },
                    none: {
                      fromEntityFieldEngineerId: fieldEngineerId,
                    },
                  },
                },
              ]
            : undefined,
        },
      });

      return { device, maxPage: Math.ceil(maxCount / limit) };
    } catch (error) {
      throw error;
    }
  },
  update: async (deviceId: string, deviceInfo: DeviceUpdateZodType) => {
    try {
      const device = await prisma.device.update({
        where: {
          id: deviceId,
        },
        data: deviceInfo,
      });

      return device;
    } catch (error) {
      throw error;
    }
  },
  delete: async (deviceId: string) => {
    try {
      const device = await prisma.device.delete({
        where: {
          id: deviceId,
        },
      });
      return device;
    } catch (error) {
      throw error;
    }
  },
  findIdByImei: async (imei: string) => {
    try {
      const device = await prisma.device.findUniqueOrThrow({
        where: {
          imei,
        },
        select: {
          id: true,
          installationRequisition: { select: { vehicleNo: true } },
        },
      });
      return device;
    } catch (error) {
      throw error;
    }
  },
};

export default deviceDb;
