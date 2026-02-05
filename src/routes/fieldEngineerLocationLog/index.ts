import { Router } from "express";
import { AuthMiddleware } from "../../middleware/auth.js";
import authAccessConfig from "../../config/access.js";
import { asyncErrorHandler } from "../../utils/asyncErrorHandler.js";
import fieldEngineerLocationLogController from "../../controllers/fieldEngineerLocationLog/index.js";

const fieldEngineerLocationLogRouter = Router();

fieldEngineerLocationLogRouter
  .post(
    "/create",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(fieldEngineerLocationLogController.create)
  )
  .delete(
    "/delete/:id",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(fieldEngineerLocationLogController.delete)
  )
  .get(
    "/list",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(fieldEngineerLocationLogController.list)
  );

export default fieldEngineerLocationLogRouter;
