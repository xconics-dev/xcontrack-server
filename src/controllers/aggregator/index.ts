import { Request, Response } from "express";
import {
  aggregatorUpdateZodSchema,
  aggregatorZodSchema,
} from "../../validators/aggregator/index.js";
import aggregatorDb from "../../models/aggregator/index.js";
import { statusCodes } from "../../config/index.js";
import { commonQueryParamsZodSchema } from "../../validators/common/index.js";
import authAccessConfig from "../../config/access.js";

const aggregatorController = {
  create: async (req: Request, res: Response) => {
    // parse body
    const aggregatorInfo = aggregatorZodSchema.parse(req.body);
    // db call
    const aggregator = await aggregatorDb.create(aggregatorInfo);
    // send response
    return res.status(statusCodes.created).json({
      message: "aggregator created successfully",
      data: aggregator.id,
    });
  },
  read: async (req: Request, res: Response) => {
    // extract aggregator id
    const { id } = req.params;

    const { userInfo } = res.locals;
    if (!authAccessConfig.isSameAggregator(userInfo, id)) {
      return res
        .status(statusCodes.forbidden)
        .send({ error: "Permission Denied" });
    }
    // db call
    const aggregator = await aggregatorDb.read(id);
    // send response
    return res.json({
      message: "aggregator read successfully",
      data: aggregator,
    });
  },
  update: async (req: Request, res: Response) => {
    // extract aggregator id
    const { id } = req.params;
    // parse body
    const aggregatorInfo = aggregatorUpdateZodSchema.parse(req.body);
    // db call
    const aggregator = await aggregatorDb.update(id, aggregatorInfo);
    // send response
    return res.json({
      message: "aggregator updated successfully",
      data: aggregator.id,
    });
  },
  delete: async (req: Request, res: Response) => {
    // extract aggregator id
    const { id } = req.params;
    // db call
    const aggregator = await aggregatorDb.delete(id);
    // send response
    return res.json({
      message: "aggregator deleted successfully",
      data: aggregator.id,
    });
  },
  list: async (req: Request, res: Response) => {
    const { userInfo } = res.locals;

    const aggregatorId = authAccessConfig.getAggregatorId(userInfo);
    // extract query params
    const { search, offset, limit } = commonQueryParamsZodSchema.parse(
      req.query
    );
    // db call
    const { aggregator, maxPage } = await aggregatorDb.list(
      search,
      offset,
      limit,
      aggregatorId
    );
    // send response
    return res.json({
      message: "aggregator list successfully",
      data: aggregator,
      maxPage,
    });
  },
};

export default aggregatorController;
