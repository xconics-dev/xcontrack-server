import { Request, Response } from "express";
import {
  installationRequisitionQueryZodSchema,
  installationRequisitionRequestQueryZodSchema,
  installationRequisitionUpdateZodSchema,
  installationRequisitionZodSchema,
} from "../../validators/installationRequisition/index.js";
import installationRequisitionDb from "../../models/installationRequisition/index.js";
import { statusCodes } from "../../config/index.js";
import { commonQueryParamsZodSchema } from "../../validators/common/index.js";
import { insertFileDetailstoDb } from "../../utils/insert.js";
import authAccessConfig from "../../config/access.js";

const installationRequisitionController = {
  create: async (req: Request, res: Response) => {
    // parse body
    const installationRequisitionInfo = installationRequisitionZodSchema.parse(
      req.body
    );
    // db call
    const { installationRequisition } = await installationRequisitionDb.create(
      installationRequisitionInfo
    );
    // send response
    return res.status(statusCodes.created).json({
      message: "installationRequisition created successfully",
      data: installationRequisition.id,
    });
  },
  bulkCreate: async (req: Request, res: Response) => {
    const { content } = req.body;

    const buffer = Buffer.from(content, "base64");

    await insertFileDetailstoDb(buffer);

    res.json({ message: "Bulk installtion requisition created!" });
  },
  read: async (req: Request, res: Response) => {
    const { userInfo } = res.locals;

    const aggregatorId = authAccessConfig.getAggregatorId(userInfo);
    // extract installationRequisition id
    const { id } = req.params;
    // db call
    const installationRequisition = await installationRequisitionDb.read(
      id,
      aggregatorId
    );
    // send response
    return res.json({
      message: "installationRequisition read successfully",
      data: installationRequisition,
    });
  },
  update: async (req: Request, res: Response) => {
    const { userInfo } = res.locals;

    const aggregatorId = authAccessConfig.getAggregatorId(userInfo);
    // extract installationRequisition id
    const { id } = req.params;
    // parse body
    const installationRequisitionInfo =
      installationRequisitionUpdateZodSchema.parse(req.body);
    // db call
    const installationRequisition = await installationRequisitionDb.update(
      id,
      installationRequisitionInfo,
      aggregatorId
    );
    // send response
    return res.json({
      message: "installationRequisition updated successfully",
      data: installationRequisition.id,
    });
  },
  rejectRequest: async (req: Request, res: Response) => {
    // extract installationRequisitionRequest id
    const { id } = req.params;
    // db call
    const { installationRequisitionRequest, engineer } =
      await installationRequisitionDb.rejectRequest(id);
    // send response
    return res.json({
      message: "installationRequisitionRequest rejected successfully",
      data: installationRequisitionRequest.id,
      engineerAssigned: engineer,
    });
  },
  acceptRequest: async (req: Request, res: Response) => {
    // extract installationRequisitionRequest id
    const { id } = req.params;
    // db call
    const installationRequisitionRequest =
      await installationRequisitionDb.acceptRequest(id);
    // send response
    return res.json({
      message: "installationRequisitionRequest rejected successfully",
      data: installationRequisitionRequest.id,
    });
  },
  delete: async (req: Request, res: Response) => {
    // extract installationRequisition id
    const { id } = req.params;
    // db call
    const installationRequisition = await installationRequisitionDb.delete(id);
    // send response
    return res.json({
      message: "installationRequisition deleted successfully",
      data: installationRequisition.id,
    });
  },
  list: async (req: Request, res: Response) => {
    const { userInfo } = res.locals;

    const aggregatorId = authAccessConfig.getAggregatorId(userInfo);
    // extract query params
    const {
      search,
      offset,
      limit,
      fieldEngineerId,
      gte,
      lte,
      status,
      installationStatus,
      branchId,
    } = installationRequisitionQueryZodSchema.parse(req.query);
    // db call
    const { installationRequisition, maxPage } =
      await installationRequisitionDb.list(
        search,
        offset,
        limit,
        fieldEngineerId,
        gte,
        lte,
        status,
        installationStatus,
        branchId,
        aggregatorId
      );
    // send response
    return res.json({
      message: "installationRequisition list successfully",
      data: installationRequisition,
      maxPage,
    });
  },
  requestList: async (req: Request, res: Response) => {
    const { userInfo } = res.locals;

    const fieldEngineerOwnId = authAccessConfig.getFieldEngineerId(userInfo);
    const aggregatorOwnId = authAccessConfig.getAggregatorId(userInfo);
    // extract query params
    const { fieldEngineerId, ticketStatus, offset, limit } =
      installationRequisitionRequestQueryZodSchema.parse(req.query);
    // db call
    const { installationRequisitionRequest, maxPage } =
      await installationRequisitionDb.listRequests(
        fieldEngineerOwnId || fieldEngineerId,
        offset,
        limit,
        ticketStatus,
        aggregatorOwnId
      );
    // send response
    return res.json({
      message: "installationRequisitionRequest list successfully",
      data: installationRequisitionRequest,
      maxPage,
    });
  },
};

export default installationRequisitionController;
