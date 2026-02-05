import { Router } from "express";
import { AuthMiddleware } from "../../middleware/auth.js";
import authAccessConfig from "../../config/access.js";
import { asyncErrorHandler } from "../../utils/asyncErrorHandler.js";
import supportTicketController from "../../controllers/supportTicket/index.js";
const supportTicketAuthConfig = authAccessConfig.supportTicket;
const supportTicketRequestAuthConfig = authAccessConfig.supportTicketRequest;
const supportTicketRouter = Router();

supportTicketRouter
  .post(
    "/create",
    AuthMiddleware(supportTicketAuthConfig.create.auth),
    asyncErrorHandler(supportTicketController.create)
  )
  .get(
    "/read/:id",
    AuthMiddleware(supportTicketAuthConfig.read.auth),
    asyncErrorHandler(supportTicketController.read)
  )
  .put(
    "/update/:id",
    AuthMiddleware(supportTicketAuthConfig.update.auth),
    asyncErrorHandler(supportTicketController.update)
  )
  .put(
    "/request/accept/:id",
    AuthMiddleware(supportTicketRequestAuthConfig.update.auth),
    asyncErrorHandler(supportTicketController.acceptRequest)
  )
  .put(
    "/request/reject/:id",
    AuthMiddleware(supportTicketRequestAuthConfig.update.auth),
    asyncErrorHandler(supportTicketController.rejectRequest)
  )
  .delete(
    "/delete/:id",
    AuthMiddleware(supportTicketAuthConfig.delete.auth),
    asyncErrorHandler(supportTicketController.delete)
  )
  .get(
    "/list",
    AuthMiddleware(supportTicketAuthConfig.read.auth),
    asyncErrorHandler(supportTicketController.list)
  )
  .get(
    "/list/requests",
    AuthMiddleware(supportTicketRequestAuthConfig.read.auth),
    asyncErrorHandler(supportTicketController.requestList)
  );

export default supportTicketRouter;
