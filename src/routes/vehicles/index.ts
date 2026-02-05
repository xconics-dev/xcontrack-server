import { Router } from "express";
import { asyncErrorHandler } from "../../utils/asyncErrorHandler.js";
import { AuthMiddleware } from "../../middleware/auth.js";
import authAccessConfig from "../../config/access.js";
import vehiclesController from "../../controllers/vehicles/index.js";

const vehicleRouter = Router();

vehicleRouter
  .get(
    "/read/:vehicleNo",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(vehiclesController.read),
  )
  .get(
    "/list",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(vehiclesController.list),
  )
  .get(
    "/alerts/list",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(vehiclesController.allAlertsList),
  )
  .get(
    "/alerts/list/:imei",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(vehiclesController.alertsList),
  )
  .get(
    "/alert/details/:sln",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(vehiclesController.alertDetails),
  )
  .delete(
    "/alert/delete/:sln",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(vehiclesController.alertDelete),
  )
  .get(
    "/data/list",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(vehiclesController.allDataPacketList),
  )
  .get(
    "/data/list/:imei",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(vehiclesController.dataPacketList),
  )

  .get(
    "/data/details/:sln",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(vehiclesController.dataPacketDetails),
  )
  .post(
    "/healthpacket/create",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(vehiclesController.healthpacketCreate),
  )
  .get(
    "/healthpacket/list/:imei",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(vehiclesController.healthPacketList),
  )
  .get(
    "/healthpacket/details/:sln",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(vehiclesController.healthPacketDetails),
  )
  .delete(
    "/healthpacket/delete/:sln",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(vehiclesController.healthPacketDelete),
  );

export default vehicleRouter;
