import { Router } from "express";
import { AuthMiddleware } from "../../middleware/auth.js";
import authAccessConfig from "../../config/access.js";
import { asyncErrorHandler } from "../../utils/asyncErrorHandler.js";
import deviceController from "../../controllers/device/index.js";
const deviceAuthConfig = authAccessConfig.device;

const deviceRouter = Router();

deviceRouter
  .post(
    "/create",
    AuthMiddleware(deviceAuthConfig.create.auth),
    asyncErrorHandler(deviceController.create)
  )
  .get(
    "/read/:id",
    AuthMiddleware(deviceAuthConfig.read.auth),
    asyncErrorHandler(deviceController.read)
  )
  .put(
    "/update/:id",
    AuthMiddleware(deviceAuthConfig.update.auth),
    asyncErrorHandler(deviceController.update)
  )
  .delete(
    "/delete/:id",
    AuthMiddleware(deviceAuthConfig.delete.auth),
    asyncErrorHandler(deviceController.delete)
  )
  .get(
    "/list",
    AuthMiddleware(deviceAuthConfig.list.auth),
    asyncErrorHandler(deviceController.list)
  );

export default deviceRouter;
