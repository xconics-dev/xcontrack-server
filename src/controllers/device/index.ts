import { Request, Response } from "express";
import {
  deviceQueryZodSchema,
  DeviceUpdateZodSchema,
  DeviceZodSchema,
} from "../../validators/device/index.js";
import deviceDb from "../../models/device/index.js";
import { statusCodes } from "../../config/index.js";
import { commonQueryParamsZodSchema } from "../../validators/common/index.js";

const deviceController = {
  create: async (req: Request, res: Response) => {
    // parse body
    const deviceInfo = DeviceZodSchema.parse(req.body);
    // db call
    const device = await deviceDb.create(deviceInfo);
    // send response
    return res.status(statusCodes.created).json({
      message: "device created successfully",
      data: device.id,
    });
  },
  read: async (req: Request, res: Response) => {
    // extract device id
    const { id } = req.params;
    // db call
    const device = await deviceDb.read(id);
    // send response
    return res.json({
      message: "device read successfully",
      data: device,
    });
  },
  update: async (req: Request, res: Response) => {
    // extract device id
    const { id } = req.params;
    // parse body
    const deviceInfo = DeviceUpdateZodSchema.parse(req.body);
    // db call
    const device = await deviceDb.update(id, deviceInfo);
    // send response
    return res.json({
      message: "device updated successfully",
      data: device.id,
    });
  },
  delete: async (req: Request, res: Response) => {
    // extract device id
    const { id } = req.params;
    // db call
    const device = await deviceDb.delete(id);
    // send response
    return res.json({
      message: "device deleted successfully",
      data: device.id,
    });
  },
  list: async (req: Request, res: Response) => {
    // extract query params
    const { search, offset, limit, fieldEngineerId, locationType } =
      deviceQueryZodSchema.parse(req.query);
    // db call
    const { device, maxPage } = await deviceDb.list(
      search,
      offset,
      limit,
      fieldEngineerId,
      locationType
    );
    // send response
    return res.json({
      message: "device list successfully",
      data: device,
      maxPage,
    });
  },
};

export default deviceController;
