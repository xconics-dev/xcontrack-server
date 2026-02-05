import { Request, Response } from "express";
import {
  supportTicketQueryZodSchema,
  supportTicketRequestQueryZodSchema,
  supportTicketUpdateZodSchema,
  supportTicketZodSchema,
} from "../../validators/supportTicket/index.js";
import supportTicketDb from "../../models/supportTicket/index.js";
import { statusCodes } from "../../config/index.js";
import {
  insertFileDetailstoDb,
  preferredInstalltionDate,
} from "../../utils/insert.js";
import aggregatorDb from "../../models/aggregator/index.js";
import authAccessConfig from "../../config/access.js";

const supportTicketController = {
  create: async (req: Request, res: Response) => {
    // parse body
    const supportTicketInfo = supportTicketZodSchema.parse(req.body);
    // db call
    const { supportTicket } = await supportTicketDb.create(supportTicketInfo);
    // assign aggregator
    const aggregator = await aggregatorDb.findFirst();

    const date = preferredInstalltionDate(supportTicket.tatHours);
    await supportTicketDb.update(supportTicket.id, {
      assignedAggregatorId: aggregator.id,
      preferredSupportDate: date,
      supportFinishTimeAssigned: date,
    });
    // send response
    return res.status(statusCodes.created).json({
      message: "supportTicket created successfully",
      data: supportTicket.id,
    });
  },
  bulkCreate: async (req: Request, res: Response) => {
    const { content } = req.body;

    const buffer = Buffer.from(content, "base64");

    await insertFileDetailstoDb(buffer);

    res.json({ message: "Bulk installtion requisition created!" });
  },
  read: async (req: Request, res: Response) => {
    // extract supportTicket id
    const { id } = req.params;
    // db call
    const supportTicket = await supportTicketDb.read(id);
    // send response
    return res.json({
      message: "supportTicket read successfully",
      data: supportTicket,
    });
  },
  update: async (req: Request, res: Response) => {
    const { userInfo } = res.locals;

    const aggregatorId = authAccessConfig.getAggregatorId(userInfo);
    // extract supportTicket id
    const { id } = req.params;
    // parse body
    const supportTicketInfo = supportTicketUpdateZodSchema.parse(req.body);
    // db call
    const supportTicket = await supportTicketDb.update(
      id,
      supportTicketInfo,
      aggregatorId
    );
    // send response
    return res.json({
      message: "supportTicket updated successfully",
      data: supportTicket.id,
    });
  },
  rejectRequest: async (req: Request, res: Response) => {
    // extract supportTicketRequest id
    const { id } = req.params;
    // db call
    const { supportTicketRequest, engineer } =
      await supportTicketDb.rejectRequest(id);
    // send response
    return res.json({
      message: "supportTicketRequest rejected successfully",
      data: supportTicketRequest.id,
      engineerAssigned: engineer,
    });
  },
  acceptRequest: async (req: Request, res: Response) => {
    // extract supportTicketRequest id
    const { id } = req.params;
    // db call
    const supportTicketRequest = await supportTicketDb.acceptRequest(id);
    // send response
    return res.json({
      message: "supportTicketRequest rejected successfully",
      data: supportTicketRequest.id,
    });
  },
  delete: async (req: Request, res: Response) => {
    // extract supportTicket id
    const { id } = req.params;
    // db call
    const supportTicket = await supportTicketDb.delete(id);
    // send response
    return res.json({
      message: "supportTicket deleted successfully",
      data: supportTicket.id,
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
      supportStatus,
      branchId,
    } = supportTicketQueryZodSchema.parse(req.query);
    // db call
    const { supportTicket, maxPage } = await supportTicketDb.list(
      search,
      offset,
      limit,
      fieldEngineerId,
      gte,
      lte,
      supportStatus,
      branchId,
      aggregatorId
    );
    // send response
    return res.json({
      message: "supportTicket list successfully",
      data: supportTicket,
      maxPage,
    });
  },
  requestList: async (req: Request, res: Response) => {
    const { userInfo } = res.locals;

    const fieldEngineerOwnId = authAccessConfig.getFieldEngineerId(userInfo);
    const aggregatorOwnId = authAccessConfig.getAggregatorId(userInfo);
    // extract query params
    const { fieldEngineerId, ticketStatus, offset, limit } =
      supportTicketRequestQueryZodSchema.parse(req.query);
    // db call
    const { supportTicketRequest, maxPage } =
      await supportTicketDb.listRequests(
        fieldEngineerOwnId || fieldEngineerId,
        offset,
        limit,
        ticketStatus,
        aggregatorOwnId
      );
    // send response
    return res.json({
      message: "supportTicketRequest list successfully",
      data: supportTicketRequest,
      maxPage,
    });
  },
};

export default supportTicketController;
