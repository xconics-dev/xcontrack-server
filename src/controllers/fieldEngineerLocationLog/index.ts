import { Request, Response } from "express";
import { FieldEngineerLocationLogZodSchema } from "../../validators/fieldEngineerLocationLog/index.js";
import fieldEngineerLocationLogDb from "../../models/fieldEngineerLocationLog/index.js";
import { statusCodes } from "../../config/index.js";
import { commonQueryParamsZodSchema } from "../../validators/common/index.js";

const fieldEngineerLocationLogController = {
  create: async (req: Request, res: Response) => {
    // parse body
    const fieldEngineerLocationLogInfo =
      FieldEngineerLocationLogZodSchema.parse(req.body);
    // db call
    const fieldEngineerLocationLog = await fieldEngineerLocationLogDb.create(
      fieldEngineerLocationLogInfo
    );
    // send response
    return res.status(statusCodes.created).json({
      message: "fieldEngineerLocationLog created successfully",
      data: fieldEngineerLocationLog.id,
    });
  },
  delete: async (req: Request, res: Response) => {
    // extract fieldEngineerLocationLog id
    const { id } = req.params;
    // db call
    const fieldEngineerLocationLog = await fieldEngineerLocationLogDb.delete(
      id
    );
    // send response
    return res.json({
      message: "fieldEngineerLocationLog deleted successfully",
      data: fieldEngineerLocationLog.id,
    });
  },
  list: async (req: Request, res: Response) => {
    // extract engineer id
    const { id } = req.params;
    // extract query params
    const { offset, limit } = commonQueryParamsZodSchema
      .pick({ offset: true, limit: true })
      .parse(req.query);
    // db call
    const { fieldEngineerLocationLog, maxPage } =
      await fieldEngineerLocationLogDb.list(offset, limit, id);
    // send response
    return res.json({
      message: "fieldEngineerLocationLog list successfully",
      data: fieldEngineerLocationLog,
      maxPage,
    });
  },
};

export default fieldEngineerLocationLogController;
