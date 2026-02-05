import { Request, Response } from "express";
import {
  lenderUpdateZodSchema,
  lenderZodSchema,
} from "../../validators/lender/index.js";
import lenderDb from "../../models/lender/index.js";
import { statusCodes } from "../../config/index.js";
import { commonQueryParamsZodSchema } from "../../validators/common/index.js";

const lenderController = {
  create: async (req: Request, res: Response) => {
    // parse body
    const lenderInfo = lenderZodSchema.parse(req.body);
    // db call
    const lender = await lenderDb.create(lenderInfo);
    // send response
    return res
      .status(statusCodes.created)
      .json({ message: "lender created successfully", data: lender.id });
  },
  read: async (req: Request, res: Response) => {
    // extract lender id
    const { id } = req.params;
    // db call
    const lender = await lenderDb.read(id);
    // send response
    return res.json({ message: "lender read successfully", data: lender });
  },
  update: async (req: Request, res: Response) => {
    // extract lender id
    const { id } = req.params;
    // parse body
    const lenderInfo = lenderUpdateZodSchema.parse(req.body);
    // db call
    const lender = await lenderDb.update(id, lenderInfo);
    // send response
    return res.json({
      message: "lender updated successfully",
      data: lender.id,
    });
  },
  delete: async (req: Request, res: Response) => {
    // extract lender id
    const { id } = req.params;
    // db call
    const lender = await lenderDb.delete(id);
    // send response
    return res.json({
      message: "lender deleted successfully",
      data: lender.id,
    });
  },
  list: async (req: Request, res: Response) => {
    // extract query params
    const { search, offset, limit } = commonQueryParamsZodSchema.parse(
      req.query
    );
    // db call
    const { lender, maxPage } = await lenderDb.list(search, offset, limit);
    // send response
    return res.json({
      message: "lender list successfully",
      data: lender,
      maxPage,
    });
  },
};

export default lenderController;
