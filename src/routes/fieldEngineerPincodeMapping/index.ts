import { Router } from "express";
import { AuthMiddleware } from "../../middleware/auth.js";
import authAccessConfig from "../../config/access.js";
import { asyncErrorHandler } from "../../utils/asyncErrorHandler.js";
import fieldEngineerPincodeMappingController from "../../controllers/fieldEngineerPincodeMapping/index.js";

const fieldEngineerPincodeMappingRouter = Router();

fieldEngineerPincodeMappingRouter
  .post(
    "/create",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(fieldEngineerPincodeMappingController.create)
  )
  .get(
    "/read/:id",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(fieldEngineerPincodeMappingController.read)
  )
  .put(
    "/update/:id",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(fieldEngineerPincodeMappingController.update)
  )
  .delete(
    "/delete/:id",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(fieldEngineerPincodeMappingController.delete)
  )
  .get(
    "/list",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(fieldEngineerPincodeMappingController.list)
  )
  .get(
    "/engineer/:engineerId",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(fieldEngineerPincodeMappingController.engineerMappings)
  )

export default fieldEngineerPincodeMappingRouter;
