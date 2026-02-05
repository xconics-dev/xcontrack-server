import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  deviceQueryZodSchema,
  deviceResponseZodSchema,
  DeviceUpdateZodSchema,
  DeviceZodSchema,
} from "../validators/device/index.js";
import { z } from "../validators/index.js";
import { commonQueryParamsZodSchema } from "../validators/common/index.js";
import {
  deviceMovementResponseZodSchema,
  warehousePartResponseSchema,
} from "../validators/deviceMovement/index.js";

export const deviceRegistry = new OpenAPIRegistry();

// Components
deviceRegistry.register("device", DeviceZodSchema);
// Components
deviceRegistry.register("deviceResponse", deviceResponseZodSchema);
// Components
deviceRegistry.register("deviceUpdate", DeviceUpdateZodSchema);

// Paths (describe each route once)

// Create device
deviceRegistry.registerPath({
  tags: ["device"],
  method: "post",
  path: "/device/create",
  summary: "Create device",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    body: {
      content: {
        "application/json": { schema: DeviceZodSchema },
      },
    },
  },
  responses: {
    201: {
      description: "Returns id of device created in db.",
      content: {
        "application/json": {
          schema: z.object({ data: z.uuid(), message: z.string() }),
        },
      },
    },
  },
});
// update device
deviceRegistry.registerPath({
  tags: ["device"],
  method: "put",
  path: "/device/update/{id}",
  summary: "update device",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ id: z.uuid() }),
    body: {
      content: {
        "application/json": { schema: DeviceUpdateZodSchema },
      },
    },
  },
  responses: {
    200: {
      description: "Returns id of device updated in db.",
      content: {
        "application/json": {
          schema: z.object({ data: z.uuid(), message: z.string() }),
        },
      },
    },
  },
});

// list device
deviceRegistry.registerPath({
  tags: ["device"],
  method: "get",
  path: "/device/list",
  summary: "List device",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    query: deviceQueryZodSchema,
  },
  responses: {
    200: {
      description: "Returns list of device from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: z.array(deviceResponseZodSchema),
            message: z.string(),
            maxPage: z.number(),
          }),
        },
      },
    },
  },
});
// read device
deviceRegistry.registerPath({
  tags: ["device"],
  method: "get",
  path: "/device/read/{id}",
  summary: "read device",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ id: z.uuid() }),
  },
  responses: {
    200: {
      description: "Returns read of device from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: deviceResponseZodSchema.extend({
              deviceMovements: z.array(deviceMovementResponseZodSchema).max(1),
              productionWarehouse: warehousePartResponseSchema.nullable(),
            }),
            message: z.string(),
          }),
        },
      },
    },
  },
});
// delete device
deviceRegistry.registerPath({
  tags: ["device"],
  method: "delete",
  path: "/device/delete/{id}",
  summary: "Delete device",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ id: z.uuid() }),
  },
  responses: {
    200: {
      description: "Returns id of deleted construction type from db.",
      content: {
        "application/json": {
          schema: z.object({ data: z.uuid(), message: z.string() }),
        },
      },
    },
  },
});
