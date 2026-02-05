import { Router } from "express";
import { AuthMiddleware } from "../../middleware/auth.js";
import authAccessConfig from "../../config/access.js";
import { asyncErrorHandler } from "../../utils/asyncErrorHandler.js";
import warehousePincodeMappingController from "../../controllers/warehousePincodeMapping/index.js";

const warehousePincodeMappingRouter = Router();

warehousePincodeMappingRouter
  .post(
    "/create",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(warehousePincodeMappingController.create)
  )
  .get(
    "/read/:id",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(warehousePincodeMappingController.read)
  )
  .put(
    "/update/:id",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(warehousePincodeMappingController.update)
  )
  .delete(
    "/delete/:id",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(warehousePincodeMappingController.delete)
  )
  .get(
    "/list",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(warehousePincodeMappingController.list)
  );

export default warehousePincodeMappingRouter;
