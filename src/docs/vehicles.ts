import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "../validators/index.js";
import { vechileAlertPacketResponseZodSchema, vechileDataPacketResponseZodSchema, vehicleResponseZodSchema } from "../validators/vehicles/index.js";
import { commonQueryParamsZodSchema } from "../validators/common/index.js";

export const vehiclesRegistry = new OpenAPIRegistry();

// Components
vehiclesRegistry.register("vehicleResponse", vehicleResponseZodSchema);


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
  path: "/vehicles/alerts/list/{imei}",
  summary: "List alert packets for a vehicle by IMEI",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ imei: z.string() }),
  },
  responses: {
    200: {
      description: "Returns list of alert packets for the specified IMEI.",
      content: {
        "application/json": {
          schema: z.object({
            data: z.array(vechileAlertPacketResponseZodSchema), // Replace z.any() with actual alert packet schema
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
      description: "Returns details of the deleted alert packet for the specified SLN.",
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
  path: "/vehicles/data/list/{imei}",
  summary: "List data packets for a vehicle by IMEI",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ imei: z.string() }),
  },
  responses: {
    200: {
      description: "Returns list of data packets for the specified IMEI.",
      content: {
        "application/json": {
          schema: z.object({
            data: z.array(vechileDataPacketResponseZodSchema), 
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
