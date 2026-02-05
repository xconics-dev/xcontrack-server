import prisma from "../index.js";
import Config from "../../config/index.js";
import { Prisma } from "../../generated/prisma/client.js";
import {
  VehicleHealthPacketZodType,
  VehicleZodType,
} from "../../validators/vehicles/index.js";

const vehiclesDb = {
  read: async (vehicleNo: string) => {
    try {
      const vehicle = await prisma.installationRequisition.findUniqueOrThrow({
        where: { vehicleNo },
        select: {
          id: true,
          vehicleNo: true,
          requestedAt: true,
          customerName: true,
          customerMobile: true,
          requisitionNo: true,
          status: true,
          deviceType: true,
          device: true,
          lender: true,
          branch: true,
          assignedAggregator: true,
        },
      });
      return vehicle as VehicleZodType;
    } catch (error) {
      throw error;
    }
  },
  list: async (
    search?: string,
    offset: number = 0,
    limit: number = Config.PAGE_ITEM_COUNT,
  ) => {
    try {
      const whereClause: Prisma.InstallationRequisitionWhereInput = {
        OR: search
          ? [
              {
                vehicleNo: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
              //   {
              //     customerName: {
              //       contains: search,
              //       mode: Prisma.QueryMode.insensitive,
              //     },
              //   },
              //   {
              //     customerMobile: {
              //       contains: search,
              //       mode: Prisma.QueryMode.insensitive,
              //     },
              //   },
            ]
          : undefined,
      };

      const vehicles = await prisma.installationRequisition.findMany({
        where: whereClause,
        skip: offset,
        take: limit,
        select: {
          id: true,
          vehicleNo: true,
          requestedAt: true,
          customerName: true,
          requisitionNo: true,
          customerMobile: true,
          status: true,
          deviceType: true,
          device: true,
          lender: true,
          branch: true,
          assignedAggregator: true,
        },
        orderBy: {
          requestedAt: "desc",
        },
      });

      const maxCount = await prisma.installationRequisition.count({
        where: whereClause,
      });

      return {
        vehicles: vehicles as VehicleZodType[],
        maxPage: Math.ceil(maxCount / limit),
      };
    } catch (error) {
      throw error;
    }
  },
  allAlertsList: async () => {
    try {
      const alerts = await prisma.alertPackets.findMany({
        orderBy: { time_stamp_server: "desc" },
      });
      return alerts;
    } catch (error) {
      throw error;
    }
  },
  alertsList: async (imei: string) => {
    try {
      const alerts = await prisma.alertPackets.findMany({
        where: { imei },
        orderBy: { time_stamp_server: "desc" },
      });
      return alerts;
    } catch (error) {
      throw error;
    }
  },
  alertDetails: async (sln: number) => {
    try {
      const alert = await prisma.alertPackets.findUniqueOrThrow({
        where: { sln },
      });
      return alert;
    } catch (error) {
      throw error;
    }
  },
  alertDelete: async (sln: number) => {
    try {
      const alert = await prisma.alertPackets.delete({
        where: { sln },
      });
      return alert;
    } catch (error) {
      throw error;
    }
  },
  dataPacketList: async (imei: string) => {
    try {
      const dataPackets = await prisma.dataPackets.findMany({
        where: { imei },
        orderBy: { time_stamp_server: "desc" },
      });
      return dataPackets;
    } catch (error) {
      throw error;
    }
  },
  allDataPacketList: async () => {
    try {
      const dataPackets = await prisma.dataPackets.findMany({
        orderBy: { time_stamp_server: "desc" },
      });
      return dataPackets;
    } catch (error) {
      throw error;
    }
  },
  dataPacketDetails: async (sln: number) => {
    try {
      const dataPacket = await prisma.dataPackets.findUniqueOrThrow({
        where: { sln },
      });
      return dataPacket;
    } catch (error) {
      throw error;
    }
  },
  healthPacketList: async (imei: string) => {
    try {
      const healthPackets = await prisma.healthPackets.findMany({
        where: { imei },
        orderBy: { time_stamp_server: "desc" },
      });
      return healthPackets;
    } catch (error) {
      throw error;
    }
  },
  healthPacketDetails: async (sln: number) => {
    try {
      const healthPacket = await prisma.healthPackets.findUniqueOrThrow({
        where: { sln },
      });
      return healthPacket;
    } catch (error) {
      throw error;
    }
  },
  healthPacketDelete: async (sln: number) => {
    try {
      const healthPacket = await prisma.healthPackets.delete({
        where: { sln },
      });
      return healthPacket;
    } catch (error) {
      throw error;
    }
  },
  healthpacketCreate: async (packetInfo: VehicleHealthPacketZodType) => {
    try {
      const healthPacket = await prisma.healthPackets.create({
        data: packetInfo,
      });
      return healthPacket;
    } catch (error) {
      throw error;
    }
  },
};

export default vehiclesDb;
