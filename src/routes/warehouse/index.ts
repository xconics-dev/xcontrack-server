import { Router } from "express";
import { AuthMiddleware } from "../../middleware/auth.js";
import authAccessConfig from "../../config/access.js";
import { asyncErrorHandler } from "../../utils/asyncErrorHandler.js";
import warehouseController from "../../controllers/warehouse/index.js";
const warehouseAuthConfig = authAccessConfig.warehouse;

const warehouseRouter = Router();

warehouseRouter
  .post(
    "/create",
    AuthMiddleware(warehouseAuthConfig.create.auth),
    asyncErrorHandler(warehouseController.create)
  )
  .get(
    "/read/:id",
    AuthMiddleware(warehouseAuthConfig.read.auth),
    asyncErrorHandler(warehouseController.read)
  )
  .put(
    "/update/:id",
    AuthMiddleware(warehouseAuthConfig.update.auth),
    asyncErrorHandler(warehouseController.update)
  )
  .delete(
    "/delete/:id",
    AuthMiddleware(warehouseAuthConfig.delete.auth),
    asyncErrorHandler(warehouseController.delete)
  )
  .get(
    "/list",
    AuthMiddleware(warehouseAuthConfig.read.auth),
    asyncErrorHandler(warehouseController.list)
  );

export default warehouseRouter;
