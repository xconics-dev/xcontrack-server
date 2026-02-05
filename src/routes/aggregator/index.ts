import { Router } from "express";
import { AuthMiddleware } from "../../middleware/auth.js";
import authAccessConfig from "../../config/access.js";
import { asyncErrorHandler } from "../../utils/asyncErrorHandler.js";
import aggregatorController from "../../controllers/aggregator/index.js";
const aggregatorAuthConfig = authAccessConfig.aggregator;

const aggregatorRouter = Router();

aggregatorRouter
  .post(
    "/create",
    AuthMiddleware(aggregatorAuthConfig.create.auth),
    asyncErrorHandler(aggregatorController.create)
  )
  .get(
    "/read/:id",
    AuthMiddleware(aggregatorAuthConfig.read.auth),
    asyncErrorHandler(aggregatorController.read)
  )
  .put(
    "/update/:id",
    AuthMiddleware(aggregatorAuthConfig.update.auth),
    asyncErrorHandler(aggregatorController.update)
  )
  .delete(
    "/delete/:id",
    AuthMiddleware(aggregatorAuthConfig.delete.auth),
    asyncErrorHandler(aggregatorController.delete)
  )
  .get(
    "/list",
    AuthMiddleware(aggregatorAuthConfig.read.auth),
    asyncErrorHandler(aggregatorController.list)
  );

export default aggregatorRouter;
