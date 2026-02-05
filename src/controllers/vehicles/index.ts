import { Request, Response } from "express";
import vehiclesDb from "../../models/vehicles/index.js";
import { commonQueryParamsZodSchema } from "../../validators/common/index.js";

const vehiclesController = {
  read: async (req: Request, res: Response) => {
    // extract vehicle number
    const { vehicleNo } = req.params;
    // db call
    const vehicle = await vehiclesDb.read(vehicleNo);
    // send response
    return res.json({
      message: "vehicle read successfully",
      data: vehicle,
    });
  },

  list: async (req: Request, res: Response) => {
    // extract query params
    const { search, offset, limit } = commonQueryParamsZodSchema.parse(
      req.query,
    );
    // db call
    const { vehicles, maxPage } = await vehiclesDb.list(search, offset, limit);
    // send response
    return res.json({
      message: "vehicles list successfully",
      data: vehicles,
      maxPage,
    });
  },
  alertsList: async (req: Request, res: Response) => {
    // extract imei
    const { imei } = req.params;
    // db call
    const alerts = await vehiclesDb.alertsList(imei);
    // send response
    return res.json({
      message: "alerts list successfully",
      data: alerts,
    });
  },
  alertDetails: async (req: Request, res: Response) => {
    // extract sln
    const { sln } = req.params;
    // db call
    const alert = await vehiclesDb.alertDetails(Number(sln));
    // send response
    return res.json({
      message: "alert details fetched successfully",
      data: alert,
    });
  },
  alertDelete: async (req: Request, res: Response) => {
    // extract sln
    const { sln } = req.params;
    // db call
    const alert = await vehiclesDb.alertDelete(Number(sln));
    // send response
    return res.json({
      message: "alert deleted successfully",
      data: alert,
    });
  },
  dataPacketList: async (req: Request, res: Response) => {
    // extract imei
    const { imei } = req.params;
    // db call
    const dataPackets = await vehiclesDb.dataPacketList(imei);
    // send response
    return res.json({
      message: "data packets list successfully",
      data: dataPackets,
    });
  },
  dataPacketDetails: async (req: Request, res: Response) => {
    // extract sln
    const { sln } = req.params;
    // db call
    const dataPacket = await vehiclesDb.dataPacketDetails(Number(sln));
    // send response
    return res.json({
      message: "data packet details fetched successfully",
      data: dataPacket,
    });
  },
};

export default vehiclesController;
