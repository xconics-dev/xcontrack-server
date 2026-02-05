import { Request, Response } from "express";
import {
  fieldEngineerQueryZodSchema,
  fieldEngineerUpdateZodSchema,
  fieldEngineerZodSchema,
} from "../../validators/fieldEngineer/index.js";
import fieldEngineerDb from "../../models/fieldEngineer/index.js";
import { statusCodes } from "../../config/index.js";
import authAccessConfig from "../../config/access.js";

const fieldEngineerController = {
  create: async (req: Request, res: Response) => {
    const { userInfo } = res.locals;
    // parse body
    const fieldEngineerInfo = fieldEngineerZodSchema.parse(req.body);

    if (
      !authAccessConfig.isSameAggregator(
        userInfo,
        fieldEngineerInfo.aggregatorId
      )
    ) {
      return res
        .status(statusCodes.forbidden)
        .send({ error: "Permission Denied" });
    }
    // db call
    const fieldEngineer = await fieldEngineerDb.create(fieldEngineerInfo);
    // send response
    return res.status(statusCodes.created).json({
      message: "fieldEngineer created successfully",
      data: fieldEngineer.id,
    });
  },
  read: async (req: Request, res: Response) => {
    const { userInfo } = res.locals;

    const aggregatorId = authAccessConfig.getAggregatorId(userInfo);
    // extract fieldEngineer id
    const { id } = req.params;
    // db call
    const fieldEngineer = await fieldEngineerDb.read(id, aggregatorId);
    // send response
    return res.json({
      message: "fieldEngineer read successfully",
      data: fieldEngineer,
    });
  },
  update: async (req: Request, res: Response) => {
    const { userInfo } = res.locals;

    const aggregatorId = authAccessConfig.getAggregatorId(userInfo);
    // extract fieldEngineer id
    const { id } = req.params;
    // parse body
    const fieldEngineerInfo = fieldEngineerUpdateZodSchema.parse(req.body);
    // db call
    const fieldEngineer = await fieldEngineerDb.update(
      id,
      fieldEngineerInfo,
      aggregatorId
    );
    // send response
    return res.json({
      message: "fieldEngineer updated successfully",
      data: fieldEngineer.id,
    });
  },
  delete: async (req: Request, res: Response) => {
    // extract fieldEngineer id
    const { id } = req.params;
    // db call
    const fieldEngineer = await fieldEngineerDb.delete(id);
    // send response
    return res.json({
      message: "fieldEngineer deleted successfully",
      data: fieldEngineer.id,
    });
  },
  list: async (req: Request, res: Response) => {
    const { userInfo } = res.locals;

    const aggregatorOwnId = authAccessConfig.getAggregatorId(userInfo);
    // extract query params
    const { search, offset, limit, aggregatorId, employmentType } =
      fieldEngineerQueryZodSchema.parse(req.query);
    // db call
    const { fieldEngineer, maxPage } = await fieldEngineerDb.list(
      search,
      offset,
      limit,
      aggregatorOwnId || aggregatorId,
      employmentType
    );
    // send response
    return res.json({
      message: "fieldEngineer list successfully",
      data: fieldEngineer,
      maxPage,
    });
  },
};

export default fieldEngineerController;
