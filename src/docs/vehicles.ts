import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "../validators/index.js";
import {
  vechileAlertPacketResponseZodSchema,
  vechileDataPacketResponseZodSchema,
  vechileHealthPacketResponseZodSchema,
  VehcileAlertPacketQueryZodSchema,
  VehcileDataPacketQueryZodSchema,
  VehcileHealthPacketQueryZodSchema,
  vehicleHealthPacketZodSchema,
  vehicleResponseZodSchema,
} from "../validators/vehicles/index.js";
import { commonQueryParamsZodSchema } from "../validators/common/index.js";

export const vehiclesRegistry = new OpenAPIRegistry();

// Components
vehiclesRegistry.register("vehicleResponse", vehicleResponseZodSchema);
vehiclesRegistry.register("vechileAlertPacketResponse", vechileAlertPacketResponseZodSchema);
vehiclesRegistry.register(
  "vechileHealthPacketResponse",
  vechileHealthPacketResponseZodSchema,
);

// Get single vehicle by vehicleNo
vehiclesRegistry.registerPath({
  tags: ["vehicles"],
  method: "get",
  path: "/vehicles/read/{vehicleNo}",
  summary: "Get vehicle details by vehicle number",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ vehicleNo: z.string() }),
  },
  responses: {
    200: {
      description:
        "Returns vehicle details with device, lender, branch, and aggregator info.",
      content: {
        "application/json": {
          schema: z.object({
            data: vehicleResponseZodSchema,
            message: z.string(),
          }),
        },
      },
    },
  },
});

// list vehicles
vehiclesRegistry.registerPath({
  tags: ["vehicles"],
  method: "get",
  path: "/vehicles/list",
  summary: "List vehicles with optional search, offset, and limit",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    query: commonQueryParamsZodSchema,
  },
  responses: {
    200: {
      description: "Returns list of vehicles from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: z.array(vehicleResponseZodSchema),
            message: z.string(),
            maxPage: z.number(),
          }),
        },
      },
    },
  },
});


// Alert packets paths
vehiclesRegistry.registerPath({
  tags: ["vehicles"],
  method: "get",
  path: "/vehicles/alerts/list",
  summary: "List alert packets for a vehicle by IMEI",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    query: VehcileAlertPacketQueryZodSchema,
  },
  responses: {
    200: {
      description: "Returns list of alert packets for the specified IMEI.",
      content: {
        "application/json": {
          schema: z.object({
            data: z.array(vechileAlertPacketResponseZodSchema),
            message: z.string(),
          }),
        },
      },
    },
  },
});

vehiclesRegistry.registerPath({
  tags: ["vehicles"],
  method: "get",
  path: "/vehicles/alert/details/{sln}",
  summary: "Get alert packet details by SLN",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ sln: z.string() }),
  },
  responses: {
    200: {
      description: "Returns details of the alert packet for the specified SLN.",
      content: {
        "application/json": {
          schema: z.object({
            data: vechileAlertPacketResponseZodSchema, // Replace z.any() with actual alert packet schema
            message: z.string(),
          }),
        },
      },
    },
  },
});

vehiclesRegistry.registerPath({
  tags: ["vehicles"],
  method: "delete",
  path: "/vehicles/alert/delete/{sln}",
  summary: "Delete an alert packet by SLN",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ sln: z.string() }),
  },
  responses: {
    200: {
      description:
        "Returns details of the deleted alert packet for the specified SLN.",
      content: {
        "application/json": {
          schema: z.object({
            data: vechileAlertPacketResponseZodSchema, // Replace z.any() with actual alert packet schema
            message: z.string(),
          }),
        },
      },
    },
  },
});

// Data packets paths
vehiclesRegistry.registerPath({
  tags: ["vehicles"],
  method: "get",
  path: "/vehicles/data/list",
  summary: "List all data packets",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    query: VehcileDataPacketQueryZodSchema, // Reusing alert packet query schema as it has common params like search, offset, limit. You can create a separate one if needed.
  },
  responses: {
    200: {
      description: "Returns list of all data packets.",
      content: {
        "application/json": {
          schema: z.object({
            data: z.array(vechileDataPacketResponseZodSchema), // Replace z.any() with actual data packet schema
            message: z.string(),
          }),
        },
      },
    },
  },
});

vehiclesRegistry.registerPath({
  tags: ["vehicles"],
  method: "get",
  path: "/vehicles/data/details/{sln}",
  summary: "Get data packet details by SLN",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ sln: z.string() }),
  },
  responses: {
    200: {
      description: "Returns details of the data packet for the specified SLN.",
      content: {
        "application/json": {
          schema: z.object({
            data: vechileDataPacketResponseZodSchema,
            message: z.string(),
          }),
        },
      },
    },
  },
});

// Health packets paths
vehiclesRegistry.registerPath({
  tags: ["vehicles"],
  method: "post",
  path: "/vehicles/healthpacket/create",
  summary: "Create a new health packet",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    body: {
      content: {
        "application/json": { schema: vehicleHealthPacketZodSchema },
      },
    },
  },
  responses: {
    201: {
      description: "Returns details of the created health packet.",
      content: {
        "application/json": {
          schema: z.object({
            data: vechileHealthPacketResponseZodSchema, // Replace z.any() with actual health packet schema
            message: z.string(),
          }),
        },
      },
    },
  },
});

vehiclesRegistry.registerPath({
  tags: ["vehicles"],
  method: "get",
  path: "/vehicles/healthpacket/list",
  summary: "List health packets for a vehicle by IMEI",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request:{
    query: VehcileHealthPacketQueryZodSchema,
  },
  responses: {
    200: {
      description: "Returns list of health packets for the specified IMEI.",
      content: {
        "application/json": {
          schema: z.object({
            data: z.array(vechileHealthPacketResponseZodSchema), // Replace z.any() with actual health packet schema
            message: z.string(),
          }),
        },
      },
    },
  },
});

vehiclesRegistry.registerPath({
  tags: ["vehicles"],
  method: "get",
  path: "/vehicles/healthpacket/details/{sln}",
  summary: "Get health packet details by SLN",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ sln: z.string() }),
  },
  responses: {
    200: {
      description:
        "Returns details of the health packet for the specified SLN.",
      content: {
        "application/json": {
          schema: z.object({
            data: vechileHealthPacketResponseZodSchema, // Replace z.any() with actual health packet schema
            message: z.string(),
          }),
        },
      },
    },
  },
});

vehiclesRegistry.registerPath({
  tags: ["vehicles"],
  method: "delete",
  path: "/vehicles/healthpacket/delete/{sln}",
  summary: "Delete a health packet by SLN",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ sln: z.string() }),
  },
  responses: {
    200: {
      description:
        "Returns details of the deleted health packet for the specified SLN.",
      content: {
        "application/json": {
          schema: z.object({
            data: vechileHealthPacketResponseZodSchema, // Replace z.any() with actual health packet schema
            message: z.string(),
          }),
        },
      },
    },
  },
});
