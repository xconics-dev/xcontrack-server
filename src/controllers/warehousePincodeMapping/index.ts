import { Request, Response } from "express";
import {
  warehousePincodeMappingUpdateZodSchema,
  warehousePincodeMappingZodSchema,
} from "../../validators/warehousePincodeMapping/index.js";
import warehousePincodeMappingDb from "../../models/warehousePincodeMapping/index.js";
import { statusCodes } from "../../config/index.js";
import { commonQueryParamsZodSchema } from "../../validators/common/index.js";

const warehousePincodeMappingController = {
  create: async (req: Request, res: Response) => {
    // parse body
    const warehousePincodeMappingInfo = warehousePincodeMappingZodSchema.parse(
      req.body
    );
    // db call
    const warehousePincodeMapping = await warehousePincodeMappingDb.create(
      warehousePincodeMappingInfo
    );
    // send response
    return res.status(statusCodes.created).json({
      message: "warehousePincodeMapping created successfully",
      data: warehousePincodeMapping.id,
    });
  },
  read: async (req: Request, res: Response) => {
    // extract warehousePincodeMapping id
    const { id } = req.params;
    // db call
    const warehousePincodeMapping = await warehousePincodeMappingDb.read(id);
    // send response
    return res.json({
      message: "warehousePincodeMapping read successfully",
      data: warehousePincodeMapping,
    });
  },
  update: async (req: Request, res: Response) => {
    // extract warehousePincodeMapping id
    const { id } = req.params;
    // parse body
    const warehousePincodeMappingInfo =
      warehousePincodeMappingUpdateZodSchema.parse(req.body);
    // db call
    const warehousePincodeMapping = await warehousePincodeMappingDb.update(
      id,
      warehousePincodeMappingInfo
    );
    // send response
    return res.json({
      message: "warehousePincodeMapping updated successfully",
      data: warehousePincodeMapping.id,
    });
  },
  delete: async (req: Request, res: Response) => {
    // extract warehousePincodeMapping id
    const { id } = req.params;
    // db call
    const warehousePincodeMapping = await warehousePincodeMappingDb.delete(id);
    // send response
    return res.json({
      message: "warehousePincodeMapping deleted successfully",
      data: warehousePincodeMapping.id,
    });
  },
  list: async (req: Request, res: Response) => {
    // extract query params
    const { search, offset, limit } = commonQueryParamsZodSchema.parse(
      req.query
    );
    // db call
    const { warehousePincodeMapping, maxPage } =
      await warehousePincodeMappingDb.list(search, offset, limit);
    // send response
    return res.json({
      message: "warehousePincodeMapping list successfully",
      data: warehousePincodeMapping,
      maxPage,
    });
  },
};

export default warehousePincodeMappingController;
