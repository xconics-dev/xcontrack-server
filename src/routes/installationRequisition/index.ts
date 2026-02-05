import { Router } from "express";
import { AuthMiddleware } from "../../middleware/auth.js";
import authAccessConfig from "../../config/access.js";
import { asyncErrorHandler } from "../../utils/asyncErrorHandler.js";
import installationRequisitionController from "../../controllers/installationRequisition/index.js";
const installationRequisitionAuthConfig =
  authAccessConfig.installationRequisition;
const installationRequisitionRequestAuthConfig =
  authAccessConfig.installationRequisitionRequest;
const installationRequisitionRouter = Router();

installationRequisitionRouter
  .post(
    "/create",
    AuthMiddleware(installationRequisitionAuthConfig.create.auth),
    asyncErrorHandler(installationRequisitionController.create)
  )
  .post(
    "/create/bulk",
    asyncErrorHandler(installationRequisitionController.bulkCreate)
  )
  .get(
    "/read/:id",
    AuthMiddleware(installationRequisitionAuthConfig.read.auth),
    asyncErrorHandler(installationRequisitionController.read)
  )
  .put(
    "/update/:id",
    AuthMiddleware(installationRequisitionAuthConfig.update.auth),
    asyncErrorHandler(installationRequisitionController.update)
  )
  .put(
    "/request/accept/:id",
    AuthMiddleware(installationRequisitionRequestAuthConfig.update.auth),
    asyncErrorHandler(installationRequisitionController.acceptRequest)
  )
  .put(
    "/request/reject/:id",
    AuthMiddleware(installationRequisitionRequestAuthConfig.update.auth),
    asyncErrorHandler(installationRequisitionController.rejectRequest)
  )
  .delete(
    "/delete/:id",
    AuthMiddleware(installationRequisitionAuthConfig.delete.auth),
    asyncErrorHandler(installationRequisitionController.delete)
  )
  .get(
    "/list",
    AuthMiddleware(installationRequisitionAuthConfig.read.auth),
    asyncErrorHandler(installationRequisitionController.list)
  )
  .get(
    "/list/requests",
    AuthMiddleware(installationRequisitionRequestAuthConfig.read.auth),
    asyncErrorHandler(installationRequisitionController.requestList)
  );

export default installationRequisitionRouter;
