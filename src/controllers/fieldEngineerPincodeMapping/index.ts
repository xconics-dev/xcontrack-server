import { Request, Response } from "express";
import {
  fieldEngineerPincodeMappingUpdateZodSchema,
  fieldEngineerPincodeMappingZodSchema,
} from "../../validators/fieldEngineerPincodeMapping/index.js";
import fieldEngineerPincodeMappingDb from "../../models/fieldEngineerPincodeMapping/index.js";
import { statusCodes } from "../../config/index.js";
import { commonQueryParamsZodSchema } from "../../validators/common/index.js";

const fieldEngineerPincodeMappingController = {
  create: async (req: Request, res: Response) => {
    // parse body
    const fieldEngineerPincodeMappingInfo =
      fieldEngineerPincodeMappingZodSchema.parse(req.body);
    // db call
    const fieldEngineerPincodeMapping =
      await fieldEngineerPincodeMappingDb.create(
        fieldEngineerPincodeMappingInfo
      );
    // send response
    return res.status(statusCodes.created).json({
      message: "fieldEngineerPincodeMapping created successfully",
      data: fieldEngineerPincodeMapping.id,
    });
  },
  read: async (req: Request, res: Response) => {
    // extract fieldEngineerPincodeMapping id
    const { id } = req.params;
    // db call
    const fieldEngineerPincodeMapping =
      await fieldEngineerPincodeMappingDb.read(id);
    // send response
    return res.json({
      message: "fieldEngineerPincodeMapping read successfully",
      data: fieldEngineerPincodeMapping,
    });
  },
  update: async (req: Request, res: Response) => {
    // extract fieldEngineerPincodeMapping id
    const { id } = req.params;
    // parse body
    const fieldEngineerPincodeMappingInfo =
      fieldEngineerPincodeMappingUpdateZodSchema.parse(req.body);
    // db call
    const fieldEngineerPincodeMapping =
      await fieldEngineerPincodeMappingDb.update(
        id,
        fieldEngineerPincodeMappingInfo
      );
    // send response
    return res.json({
      message: "fieldEngineerPincodeMapping updated successfully",
      data: fieldEngineerPincodeMapping.id,
    });
  },
  delete: async (req: Request, res: Response) => {
    // extract fieldEngineerPincodeMapping id
    const { id } = req.params;
    // db call
    const fieldEngineerPincodeMapping =
      await fieldEngineerPincodeMappingDb.delete(id);
    // send response
    return res.json({
      message: "fieldEngineerPincodeMapping deleted successfully",
      data: fieldEngineerPincodeMapping.id,
    });
  },
  list: async (req: Request, res: Response) => {
    // extract query params
    const { search, offset, limit } = commonQueryParamsZodSchema.parse(
      req.query
    );
    // db call
    const { fieldEngineerPincodeMapping, maxPage } =
      await fieldEngineerPincodeMappingDb.list(search, offset, limit);
    // send response
    return res.json({
      message: "fieldEngineerPincodeMapping list successfully",
      data: fieldEngineerPincodeMapping,
      maxPage,
    });
  },
  engineerMappings: async (req: Request, res: Response) => {
    // extract engineer id
    const { engineerId } = req.params;
    // db call
    const mappings =
      await fieldEngineerPincodeMappingDb.engineerMappings(engineerId);
    // send response
    return res.json({
      message: "field engineer mappings fetched successfully",
      data: mappings,
    });
  },
};

export default fieldEngineerPincodeMappingController;
