import prisma from "../index.js";
import Config from "../../config/index.js";
import {
  DeviceMovementUpdateZodType,
  DeviceMovementZodType,
} from "../../validators/deviceMovement/index.js";
import { Prisma } from "../../generated/prisma/client.js";
import { getLocationType } from "../../utils/getLocationType.js";

export const deviceMovementInclude = {
  device: {
    select: {
      imei: true,
      qr: true,
    },
  },
  fromEntityWarehouse: {
    select: {
      warehouseCode: true,
      address: true,
      latitude: true,
      longitude: true,
    },
  },
  toEntityWarehouse: {
    select: {
      warehouseCode: true,
      address: true,
      latitude: true,
      longitude: true,
    },
  },
  fromEntityFieldEngineer: {
    select: {
      engineerName: true,
      engineerCode: true,
    },
  },
  toEntityFieldEngineer: {
    select: {
      engineerName: true,
      engineerCode: true,
    },
  },
  fromEntityVehicle: {
    select: {
      vehicleNo: true,
    },
  },
  toEntityVehicle: {
    select: {
      vehicleNo: true,
    },
  },
} satisfies Prisma.DeviceMovementInclude;

const deviceMovementDb = {
  create: async (deviceMovementInfo: DeviceMovementZodType) => {
    try {
      const deviceMovement = await prisma.deviceMovement.create({
        data: { ...deviceMovementInfo },
      });

      if (deviceMovement.movementStatus === "RECEIVED") {
        await prisma.device.update({
          where: {
            id: deviceMovementInfo.deviceId,
          },
          data: {
            locationType: getLocationType(deviceMovement.movementType),
          },
        });
      }

      return deviceMovement;
    } catch (error) {
      throw error;
    }
  },
  read: async (deviceMovementId: string) => {
    try {
      const deviceMovement = await prisma.deviceMovement.findUniqueOrThrow({
        where: { id: deviceMovementId },
        include: deviceMovementInclude,
      });

      return deviceMovement;
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
      const deviceMovement = await prisma.deviceMovement.findMany({
        where: {
          device: {
            OR: [
              {
                qr: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                imei: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          },
        },
        skip: offset,
        take: limit,
        include: {
          device: { select: { imei: true, qr: true } },
          fromEntityWarehouse: {
            select: {
              warehouseCode: true,
            },
          },
          toEntityWarehouse: {
            select: {
              warehouseCode: true,
            },
          },
          fromEntityFieldEngineer: {
            select: { engineerCode: true },
          },
          toEntityFieldEngineer: {
            select: { engineerCode: true },
          },
          fromEntityVehicle: {
            select: {
              vehicleNo: true,
            },
          },
          toEntityVehicle: {
            select: {
              vehicleNo: true,
            },
          },
        },
      });

      const maxCount = await prisma.deviceMovement.count({
        where: {
          device: {
            OR: [
              {
                qr: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                imei: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          },
        },
      });

      return { deviceMovement, maxPage: Math.ceil(maxCount / limit) };
    } catch (error) {
      throw error;
    }
  },
  update: async (
    deviceMovementId: string,
    deviceMovementInfo: DeviceMovementUpdateZodType
  ) => {
    try {
      const deviceMovement = await prisma.deviceMovement.update({
        where: {
          id: deviceMovementId,
        },
        data: deviceMovementInfo,
      });

      if (deviceMovement.movementStatus === "RECEIVED") {
        await prisma.device.update({
          where: {
            id: deviceMovementInfo.deviceId,
          },
          data: {
            locationType: getLocationType(deviceMovement.movementType),
          },
        });
      }

      return deviceMovement;
    } catch (error) {
      throw error;
    }
  },
  delete: async (deviceMovementId: string) => {
    try {
      const deviceMovement = await prisma.deviceMovement.delete({
        where: {
          id: deviceMovementId,
        },
      });
      return deviceMovement;
    } catch (error) {
      throw error;
    }
  },
};

export default deviceMovementDb;
