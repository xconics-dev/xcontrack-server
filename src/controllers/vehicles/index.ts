import { Request, Response } from "express";
import vehiclesDb from "../../models/vehicles/index.js";
import { commonQueryParamsZodSchema } from "../../validators/common/index.js";
import {
  VehcileAlertPacketQueryZodSchema,
  VehcileDataPacketQueryZodSchema,
  VehcileHealthPacketQueryZodSchema,
  VehicleHealthPacketZodType,
} from "../../validators/vehicles/index.js";

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

  // alerts paths
  alertsList: async (req: Request, res: Response) => {
    // extract imei
    const { imei, search, offset, limit } =
      VehcileAlertPacketQueryZodSchema.parse(req.query);
    // db call
    const alerts = await vehiclesDb.alertsList(imei, search, offset, limit);
    
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

  // data packets paths
  dataPacketList: async (req: Request, res: Response) => {
    // extract imei
    const { imei, search, offset, limit } =
      VehcileDataPacketQueryZodSchema.parse(req.query);
    // db call
    const dataPackets = await vehiclesDb.dataPacketList(
      imei,
      search,
      offset,
      limit,
    );
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

  // health packet list
  healthPacketList: async (req: Request, res: Response) => {
    // extract imei
    const { imei, search, offset, limit } =
      VehcileHealthPacketQueryZodSchema.parse(req.query);
    // db call
    const healthPackets = await vehiclesDb.healthPacketList(
      imei,
      search,
      offset,
      limit,
    );
    // send response
    return res.json({
      message: "health packets list successfully",
      data: healthPackets,
    });
  },
  healthPacketDetails: async (req: Request, res: Response) => {
    // extract sln
    const { sln } = req.params;
    // db call
    const healthPacket = await vehiclesDb.healthPacketDetails(Number(sln));
    // send response
    return res.json({
      message: "health packet details fetched successfully",
      data: healthPacket,
    });
  },
  healthPacketDelete: async (req: Request, res: Response) => {
    // extract sln
    const { sln } = req.params;
    // db call
    const healthPacket = await vehiclesDb.healthPacketDelete(Number(sln));
    // send response
    return res.json({
      message: "health packet deleted successfully",
      data: healthPacket,
    });
  },
  healthPacketCreate: async (req: Request, res: Response) => {
    try {
      let packetInfo: string | VehicleHealthPacketZodType;

      if (typeof req.body.packet === "string") {
        packetInfo = req.body.packet;
      } else if (typeof req.body === "string") {
        packetInfo = req.body;
      } else {
        packetInfo = req.body;
      }

      const healthPacket = await vehiclesDb.healthPacketCreate(packetInfo);

      // Serialize BigInt fields before response
      const responseData = JSON.parse(
        JSON.stringify(healthPacket, (key, value) =>
          typeof value === "bigint" ? value.toString() : value,
        ),
      );

      return res.status(201).json({
        message: "health packet created successfully",
        data: responseData,
      });
    } catch (error) {
      return res.status(400).json({
        error:
          error instanceof Error
            ? error.message
            : "Failed to create health packet",
      });
    }
  },
  healthPacketTrigger: async (req: Request, res: Response) => {
    try {
      const { imei } = req.params;
      const healthPacket = await vehiclesDb.healthPacketTrigger(imei);

      // Convert BigInts to strings for JSON
      const serializableData = JSON.parse(
        JSON.stringify(healthPacket, (key, value) =>
          typeof value === "bigint" ? value.toString() : value,
        ),
      );

      return res.json({
        message: "health packet triggered successfully",
        data: serializableData,
      });
    } catch (error) {
      console.error("Health packet trigger error:", error);
      return res.status(500).json({
        message: "Failed to trigger health packet",
        error:
          process.env.NODE_ENV === "development"
            ? (error instanceof Error ? error.message : String(error))
            : "Something went wrong",
      });
    }
  },
};

export default vehiclesController;
