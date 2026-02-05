import { Request, Response } from "express";
import {
  deviceMovementUpdateZodSchema,
  deviceMovementZodSchema,
} from "../../validators/deviceMovement/index.js";
import deviceMovementDb from "../../models/deviceMovement/index.js";
import { statusCodes } from "../../config/index.js";
import { commonQueryParamsZodSchema } from "../../validators/common/index.js";

const deviceMovementController = {
  create: async (req: Request, res: Response) => {
    // parse body
    const deviceMovementInfo = deviceMovementZodSchema.parse(req.body);
    // db call
    const deviceMovement = await deviceMovementDb.create(deviceMovementInfo);
    // send response
    return res.status(statusCodes.created).json({
      message: "deviceMovement created successfully",
      data: deviceMovement.id,
    });
  },
  read: async (req: Request, res: Response) => {
    // extract deviceMovement id
    const { id } = req.params;
    // db call
    const deviceMovement = await deviceMovementDb.read(id);
    // send response
    return res.json({
      message: "deviceMovement read successfully",
      data: deviceMovement,
    });
  },
  update: async (req: Request, res: Response) => {
    // extract deviceMovement id
    const { id } = req.params;
    // parse body
    const deviceMovementInfo = deviceMovementUpdateZodSchema.parse(req.body);
    // db call
    const deviceMovement = await deviceMovementDb.update(
      id,
      deviceMovementInfo
    );
    // send response
    return res.json({
      message: "deviceMovement updated successfully",
      data: deviceMovement.id,
    });
  },
  delete: async (req: Request, res: Response) => {
    // extract deviceMovement id
    const { id } = req.params;
    // db call
    const deviceMovement = await deviceMovementDb.delete(id);
    // send response
    return res.json({
      message: "deviceMovement deleted successfully",
      data: deviceMovement.id,
    });
  },
  list: async (req: Request, res: Response) => {
    // extract query params
    const { search, offset, limit } = commonQueryParamsZodSchema.parse(
      req.query
    );
    // db call
    const { deviceMovement, maxPage } = await deviceMovementDb.list(
      search,
      offset,
      limit
    );
    // send response
    return res.json({
      message: "deviceMovement list successfully",
      data: deviceMovement,
      maxPage,
    });
  },
};

export default deviceMovementController;
