import { Request, Response } from "express";
import {
  warehouseQueryZodSchema,
  warehouseUpdateZodSchema,
  warehouseZodSchema,
} from "../../validators/warehouse/index.js";
import warehouseDb from "../../models/warehouse/index.js";
import { statusCodes } from "../../config/index.js";
import { commonQueryParamsZodSchema } from "../../validators/common/index.js";

const warehouseController = {
  create: async (req: Request, res: Response) => {
    // parse body
    const warehouseInfo = warehouseZodSchema.parse(req.body);
    // db call
    const warehouse = await warehouseDb.create(warehouseInfo);
    // send response
    return res
      .status(statusCodes.created)
      .json({ message: "warehouse created successfully", data: warehouse.id });
  },
  read: async (req: Request, res: Response) => {
    // extract warehouse id
    const { id } = req.params;
    // db call
    const warehouse = await warehouseDb.read(id);
    // send response
    return res.json({
      message: "warehouse read successfully",
      data: warehouse,
    });
  },
  update: async (req: Request, res: Response) => {
    // extract warehouse id
    const { id } = req.params;
    // parse body
    const warehouseInfo = warehouseUpdateZodSchema.parse(req.body);
    // db call
    const warehouse = await warehouseDb.update(id, warehouseInfo);
    // send response
    return res.json({
      message: "warehouse updated successfully",
      data: warehouse.id,
    });
  },
  delete: async (req: Request, res: Response) => {
    // extract warehouse id
    const { id } = req.params;
    // db call
    const warehouse = await warehouseDb.delete(id);
    // send response
    return res.json({
      message: "warehouse deleted successfully",
      data: warehouse.id,
    });
  },
  list: async (req: Request, res: Response) => {
    // extract query params
    const {
      search,
      offset,
      limit,
      aggregatorId,
      warehouseOwnerType,
      warehouseType,
    } = warehouseQueryZodSchema.parse(req.query);
    // db call
    const { warehouse, maxPage } = await warehouseDb.list(
      search,
      offset,
      limit,
      aggregatorId,
      warehouseOwnerType,
      warehouseType
    );
    // send response
    return res.json({
      message: "warehouse list successfully",
      data: warehouse,
      maxPage,
    });
  },
};

export default warehouseController;
