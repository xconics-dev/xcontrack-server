import { Request, Response } from "express";
import {
  deviceTrackingQueryZodSchema,
  deviceTrackingUpdateZodSchema,
  deviceTrackingZodSchema,
} from "../../validators/deviceTracking/index.js";
import deviceTrackingDb from "../../models/deviceTracking/index.js";
import { statusCodes } from "../../config/index.js";
import { commonQueryParamsZodSchema } from "../../validators/common/index.js";
import { parsePacket } from "../../utils/parsePacket.js";
import deviceDb from "../../models/device/index.js";

const deviceTrackingController = {
  create: async (req: Request, res: Response) => {
    const packet = req.body.packet;
    //
    // await deviceTrackingDb.createPacket(packet);
    const parts = parsePacket(packet);
    const [
      packetType, // "NRM"
      imei, // device IMEI
      battery,
      epoch,
      latitudeRaw,
      longitudeRaw,
      satellites,
      speed,
      cog,
      csq,
      altitude,
      ignition,
      hdop,
      pdop,
    ] = parts;
    const device = await deviceDb.findIdByImei(imei);

    if (!device.installationRequisition?.vehicleNo) {
      return res
        .status(statusCodes.clientError)
        .json({ error: "Device is not currently installed!" });
    }
    // parse body
    const deviceTrackingInfo = deviceTrackingZodSchema.parse({
      deviceId: device.id,
      vehicleNumber: device.installationRequisition.vehicleNo,
      trackingTimestamp: new Date(+epoch),
      latitude: latitudeRaw,
      longitude: longitudeRaw,
      altitude,
      speed,
      satelliteCount: satellites,
      batteryVoltage: battery,
      cog,
      csq,
      hdop,
      pdop,
      ignitionStatus: +ignition ? "ON" : "OFF",
    });
    // db call
    const deviceTracking = await deviceTrackingDb.create(deviceTrackingInfo);
    // send response
    return res.status(statusCodes.created).json({
      message: "deviceTracking created successfully",
      data: deviceTracking.id,
    });
  },
  list: async (req: Request, res: Response) => {
    // extract query params
    const { offset, limit, installationRequisitionId } =
      deviceTrackingQueryZodSchema.parse(req.query);
    // db call
    const deviceTracking = await deviceTrackingDb.list(
      offset,
      limit,
      installationRequisitionId
    );
    // send response
    return res.json({
      message: "deviceTracking list successfully",
      data: deviceTracking,
    });
  },
};

export default deviceTrackingController;
