import prisma from "../index.js";
import Config from "../../config/index.js";
import { DeviceTrackingZodType } from "../../validators/deviceTracking/index.js";

const deviceTrackingDb = {
  create: async (deviceTrackingInfo: DeviceTrackingZodType) => {
    try {
      const deviceTracking = await prisma.deviceTracking.create({
        data: deviceTrackingInfo,
      });
      return deviceTracking;
    } catch (error) {
      throw error;
    }
  },
  // createPacket: async (packetInfo: string) => {
  //   try {
  //     const packet = await prisma.deviceTracking.create({
  //       data: { packet: packetInfo },
  //     });
  //     return packet;
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  list: async (
    offset: number = 0,
    limit: number = Config.PAGE_ITEM_COUNT,
    installationRequisitionId?: string
  ) => {
    try {
      const deviceTracking = await prisma.deviceTracking.findMany({
        where: { Vehicle: { id: installationRequisitionId } },
        skip: offset,
        take: limit,
        orderBy: { trackingTimestamp: "desc" },
      });

      return deviceTracking;
    } catch (error) {
      throw error;
    }
  },
};

export default deviceTrackingDb;
