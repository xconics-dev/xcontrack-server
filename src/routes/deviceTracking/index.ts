import { Router } from "express";
import { AuthMiddleware } from "../../middleware/auth.js";
import authAccessConfig from "../../config/access.js";
import { asyncErrorHandler } from "../../utils/asyncErrorHandler.js";
import deviceTrackingController from "../../controllers/deviceTracking/index.js";

const deviceTrackingRouter = Router();

deviceTrackingRouter
  .post(
    "/create",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(deviceTrackingController.create)
  )
  .get(
    "/list",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(deviceTrackingController.list)
  );

export default deviceTrackingRouter;
