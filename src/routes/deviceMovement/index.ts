import { Router } from "express";
import { AuthMiddleware } from "../../middleware/auth.js";
import authAccessConfig from "../../config/access.js";
import { asyncErrorHandler } from "../../utils/asyncErrorHandler.js";
import deviceMovementController from "../../controllers/deviceMovement/index.js";
const deviceMovementAuthConfig = authAccessConfig.deviceMovement;

const deviceMovementRouter = Router();

deviceMovementRouter
  .post(
    "/create",
    AuthMiddleware(deviceMovementAuthConfig.create.auth),
    asyncErrorHandler(deviceMovementController.create)
  )
  .get(
    "/read/:id",
    AuthMiddleware(deviceMovementAuthConfig.read.auth),
    asyncErrorHandler(deviceMovementController.read)
  )
  .put(
    "/update/:id",
    AuthMiddleware(deviceMovementAuthConfig.update.auth),
    asyncErrorHandler(deviceMovementController.update)
  )
  .delete(
    "/delete/:id",
    AuthMiddleware(deviceMovementAuthConfig.delete.auth),
    asyncErrorHandler(deviceMovementController.delete)
  )
  .get(
    "/list",
    AuthMiddleware(deviceMovementAuthConfig.read.auth),
    asyncErrorHandler(deviceMovementController.list)
  );

export default deviceMovementRouter;
