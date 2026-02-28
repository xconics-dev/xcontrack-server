import prisma from "../index.js";
import Config from "../../config/index.js";
import { Prisma } from "../../generated/prisma/client.js";
import { z } from "zod";
import {
  VehicleHealthPacketZodType,
  VehicleZodType,
  vehicleHealthPacketZodSchema,
} from "../../validators/vehicles/index.js";
import {
  generateHealthPacket,
  parseHealthPacket,
} from "../../utils/parse-healthpacket.js";

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
          // lender: true,
          // branch: true,
          // assignedAggregator: true,
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
          // lender: true,
          // branch: true,
          // assignedAggregator: true,
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
  alertsList: async (
    imei?: string,
    search?: string,
    offset: number = 0,
    limit: number = Config.PAGE_ITEM_COUNT,
  ) => {
    try {
      const whereClause: Prisma.AlertPacketsWhereInput = {
        ...(imei && { imei }),
        OR: search
          ? [
              {
                packet: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            ]
          : undefined,
      };

      const alerts = await prisma.alertPackets.findMany({
        where: whereClause,
        skip: offset,
        take: limit,
        orderBy: { time_stamp_server: "desc" },
      });

      const enrichedAlerts = await Promise.all(
        alerts.map(async (alert) => {
          const vehicle = alert.imei
            ? await prisma.installationRequisition.findFirst({
                where: { device: { imei: alert.imei } },
                select: { vehicleNo: true },
              })
            : null;
          return {
            ...alert,
            vehicleNo: vehicle?.vehicleNo || "Unknown",
          };
        }),
      );

      const maxCount = await prisma.alertPackets.count({
        where: whereClause,
      });

      return {
        alerts: enrichedAlerts,
        maxPage: Math.ceil(maxCount / limit),
      };
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

  // data packets paths
  dataPacketList: async (
    imei?: string,
    search?: string,
    offset: number = 0,
    limit: number = Config.PAGE_ITEM_COUNT,
  ) => {
    try {
      const whereClause: Prisma.DataPacketsWhereInput = {
        imei,
        OR: search
          ? [
              {
                packet: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
              //   {
              //     mqtt_topic: {
              //       contains: search,
              //       mode: Prisma.QueryMode.insensitive,
              //     },
              //   },
            ]
          : undefined,
      };

      const dataPackets = await prisma.dataPackets.findMany({
        where: whereClause,
        select: {
          sln: true,
          latitude: true,
          longitude: true,
          main_power: true,
          network_strength: true,
          speed: true,
          // battery_voltage: true,
          time_stamp_server: true,
          ignition_status: true,
          jerk_status: true,
          packet: true,
        },
        skip: offset,
        take: limit,
        orderBy: { time_stamp_server: "desc" },
      });

      const maxCount = await prisma.dataPackets.count({
        where: whereClause,
      });

      return {
        dataPackets,
        maxPage: Math.ceil(maxCount / limit),
      };
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

  healthPacketList: async (
    imei?: string,
    search?: string,
    offset: number = 0,
    limit: number = Config.PAGE_ITEM_COUNT,
  ) => {
    try {
      const whereClause: Prisma.HealthPacketsWhereInput = {
        imei,
        OR: search
          ? [
              {
                packet: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
              //   {
              //     mqtt_topic: {
              //       contains: search,
              //       mode: Prisma.QueryMode.insensitive,
              //     },
              //   },
            ]
          : undefined,
      };

      const healthPackets = await prisma.healthPackets.findMany({
        where: whereClause,
        skip: offset,
        select: {
          packet: false,
          connection: true,
          imei: true,
          latitude: true,
          longitude: true,
          main_power: true,
          epoch_time: true,
          time_stamp_server: true,
          sln: false,
          packet_type: false,
          battery_voltage: false,
        },
        take: limit,
        orderBy: { time_stamp_server: "desc" },
      });

      const maxCount = await prisma.healthPackets.count({
        where: whereClause,
      });

      return {
        healthPackets,
        maxPage: Math.ceil(maxCount / limit),
      };
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
  healthPacketCreate: async (
    packetInfo: VehicleHealthPacketZodType | string,
  ) => {
    try {
      let data: VehicleHealthPacketZodType;

      if (typeof packetInfo === "string") {
        // Parse raw MQTT packet
        const parsed = parseHealthPacket(packetInfo);
        data = {
          ...parsed,
          time_stamp_server: new Date(),
        };
      } else {
        // Direct object input
        data = packetInfo;
      }

      vehicleHealthPacketZodSchema.parse(data); // Validate

      const healthPacket = await prisma.healthPackets.create({
        data,
      });
      return healthPacket;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`Validation failed: ${(error as z.ZodError).message}`);
      }
      throw error;
    }
  },
  healthPacketTrigger: async (imei: string) => {
    try {
      const healthPacketString = generateHealthPacket(imei);
      const parsed = parseHealthPacket(healthPacketString);
      const data: VehicleHealthPacketZodType = {
        ...parsed,
        // sln: BigInt(Date.now()), // or use auto-increment/UUID
        time_stamp_server: new Date(),
      };

      vehicleHealthPacketZodSchema.parse(data); // Validate

      const healthPacket = await prisma.healthPackets.create({
        data,
      });
      return healthPacket;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`Validation failed: ${(error as z.ZodError).message}`);
      }
      throw error;
    }
  },

  // ignition off records paths
  ignitionOffRecordList: async (
    imei?: string,
    search?: string,
    offset: number = 0,
    limit: number = Config.PAGE_ITEM_COUNT,
  ) => {
    try {
      const whereClause: Prisma.DeviceIgnitionOffRecordWhereInput = {
        imei,
        OR: search
          ? [
              {
                vehicleNo: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            ]
          : undefined,
      };

      const records = await prisma.deviceIgnitionOffRecord.findMany({
        where: whereClause,
        skip: offset,
        take: limit,
        orderBy: { createdAt: "desc" },
      });

      const maxCount = await prisma.deviceIgnitionOffRecord.count({
        where: whereClause,
      });

      return {
        records,
        maxPage: Math.ceil(maxCount / limit),
      };
    } catch (error) {
      throw error;
    }
  }
};

export default vehiclesDb;
