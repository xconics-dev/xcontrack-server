import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  deviceMovementListResponseZodSchema,
  deviceMovementResponseZodSchema,
  deviceMovementUpdateZodSchema,
  deviceMovementZodSchema,
} from "../validators/deviceMovement/index.js";
import { z } from "../validators/index.js";
import { commonQueryParamsZodSchema } from "../validators/common/index.js";

export const deviceMovementRegistry = new OpenAPIRegistry();

// Components
deviceMovementRegistry.register("deviceMovement", deviceMovementZodSchema);
// Components
deviceMovementRegistry.register(
  "deviceMovementResponse",
  deviceMovementResponseZodSchema
);
deviceMovementRegistry.register(
  "deviceMovementListResponse",
  deviceMovementListResponseZodSchema
);
// Components
deviceMovementRegistry.register(
  "deviceMovementUpdate",
  deviceMovementUpdateZodSchema
);

// Paths (describe each route once)

// Create deviceMovement
deviceMovementRegistry.registerPath({
  tags: ["deviceMovement"],
  method: "post",
  path: "/deviceMovement/create",
  summary: "Create deviceMovement",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    body: {
      content: {
        "application/json": { schema: deviceMovementZodSchema },
      },
    },
  },
  responses: {
    201: {
      description: "Returns id of deviceMovement created in db.",
      content: {
        "application/json": {
          schema: z.object({ data: z.uuid(), message: z.string() }),
        },
      },
    },
  },
});
// update deviceMovement
deviceMovementRegistry.registerPath({
  tags: ["deviceMovement"],
  method: "put",
  path: "/deviceMovement/update/{id}",
  summary: "update deviceMovement",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ id: z.uuid() }),
    body: {
      content: {
        "application/json": { schema: deviceMovementUpdateZodSchema },
      },
    },
  },
  responses: {
    200: {
      description: "Returns id of deviceMovement updated in db.",
      content: {
        "application/json": {
          schema: z.object({ data: z.uuid(), message: z.string() }),
        },
      },
    },
  },
});

// list deviceMovement
deviceMovementRegistry.registerPath({
  tags: ["deviceMovement"],
  method: "get",
  path: "/deviceMovement/list",
  summary: "List deviceMovement",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    query: commonQueryParamsZodSchema,
  },
  responses: {
    200: {
      description: "Returns list of deviceMovement from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: z.array(deviceMovementListResponseZodSchema),
            message: z.string(),
            maxPage: z.number(),
          }),
        },
      },
    },
  },
});
// read deviceMovement
deviceMovementRegistry.registerPath({
  tags: ["deviceMovement"],
  method: "get",
  path: "/deviceMovement/read/{id}",
  summary: "read deviceMovement",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ id: z.uuid() }),
  },
  responses: {
    200: {
      description: "Returns read of deviceMovement from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: deviceMovementResponseZodSchema,
            message: z.string(),
          }),
        },
      },
    },
  },
});
// delete deviceMovement
deviceMovementRegistry.registerPath({
  tags: ["deviceMovement"],
  method: "delete",
  path: "/deviceMovement/delete/{id}",
  summary: "Delete deviceMovement",
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
