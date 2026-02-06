import { Router } from "express";
import { asyncErrorHandler } from "../../utils/asyncErrorHandler.js";
import { AuthMiddleware } from "../../middleware/auth.js";
import authAccessConfig from "../../config/access.js";
import vehiclesController from "../../controllers/vehicles/index.js";
import express from "express";

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
    express.urlencoded({ extended: true }), // Add URL-encoded parser
    AuthMiddleware(authAccessConfig.all.auth), // Keep auth after parser
    asyncErrorHandler(vehiclesController.healthpacketCreate),
  )
  .get(
    "/healthpacket/list",
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
