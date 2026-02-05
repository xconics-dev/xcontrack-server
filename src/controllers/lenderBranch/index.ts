import { Request, Response } from "express";
import {
  lenderBranchQueryZodSchema,
  lenderBranchUpdateZodSchema,
  lenderBranchZodSchema,
} from "../../validators/lenderBranch/index.js";
import lenderBranchDb from "../../models/lenderBranch/index.js";
import { statusCodes } from "../../config/index.js";
import authAccessConfig from "../../config/access.js";

const lenderBranchController = {
  create: async (req: Request, res: Response) => {
    const { userInfo } = res.locals;
    // parse body
    const lenderBranchInfo = lenderBranchZodSchema.parse(req.body);

    if (!authAccessConfig.isSameLender(userInfo, lenderBranchInfo.lenderId)) {
      return res
        .status(statusCodes.forbidden)
        .send({ error: "Permission Denied" });
    }
    // db call
    const lenderBranch = await lenderBranchDb.create(lenderBranchInfo);
    // send response
    return res.status(statusCodes.created).json({
      message: "lenderBranch created successfully",
      data: lenderBranch.id,
    });
  },
  read: async (req: Request, res: Response) => {
    const { userInfo } = res.locals;

    const lenderId = authAccessConfig.getLenderId(userInfo);
    // extract lenderBranch id
    const { id } = req.params;
    // db call
    const lenderBranch = await lenderBranchDb.read(id, lenderId);
    // send response
    return res.json({
      message: "lenderBranch read successfully",
      data: lenderBranch,
    });
  },
  update: async (req: Request, res: Response) => {
    const { userInfo } = res.locals;

    const lenderId = authAccessConfig.getLenderId(userInfo);
    // extract lenderBranch id
    const { id } = req.params;
    // parse body
    const lenderBranchInfo = lenderBranchUpdateZodSchema.parse(req.body);
    // db call
    const lenderBranch = await lenderBranchDb.update(
      id,
      lenderBranchInfo,
      lenderId
    );
    // send response
    return res.json({
      message: "lenderBranch updated successfully",
      data: lenderBranch.id,
    });
  },
  delete: async (req: Request, res: Response) => {
    // extract lenderBranch id
    const { id } = req.params;
    // db call
    const lenderBranch = await lenderBranchDb.delete(id);
    // send response
    return res.json({
      message: "lenderBranch deleted successfully",
      data: lenderBranch.id,
    });
  },
  list: async (req: Request, res: Response) => {
    const { userInfo } = res.locals;

    const lenderOwnId = authAccessConfig.getLenderId(userInfo);
    // extract query params
    const { search, offset, limit, lenderId } =
      lenderBranchQueryZodSchema.parse(req.query);
    // db call
    const { lenderBranch, maxPage } = await lenderBranchDb.list(
      search,
      offset,
      limit,
      lenderOwnId || lenderId
    );
    // send response
    return res.json({
      message: "lenderBranch list successfully",
      data: lenderBranch,
      maxPage,
    });
  },
};

export default lenderBranchController;
