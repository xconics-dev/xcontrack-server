import { Router } from "express";
import { AuthMiddleware } from "../../middleware/auth.js";
import authAccessConfig from "../../config/access.js";
import { asyncErrorHandler } from "../../utils/asyncErrorHandler.js";
import fieldEngineerController from "../../controllers/fieldEngineer/index.js";
const fieldEngineerAuthConfig = authAccessConfig.fieldEngineer;
const fieldEngineerRouter = Router();

fieldEngineerRouter
  .post(
    "/create",
    AuthMiddleware(fieldEngineerAuthConfig.create.auth),
    asyncErrorHandler(fieldEngineerController.create)
  )
  .get(
    "/read/:id",
    AuthMiddleware(fieldEngineerAuthConfig.read.auth),
    asyncErrorHandler(fieldEngineerController.read)
  )
  .put(
    "/update/:id",
    AuthMiddleware(fieldEngineerAuthConfig.update.auth),
    asyncErrorHandler(fieldEngineerController.update)
  )
  .delete(
    "/delete/:id",
    AuthMiddleware(fieldEngineerAuthConfig.delete.auth),
    asyncErrorHandler(fieldEngineerController.delete)
  )
  .get(
    "/list",
    AuthMiddleware(fieldEngineerAuthConfig.read.auth),
    asyncErrorHandler(fieldEngineerController.list)
  );

export default fieldEngineerRouter;
