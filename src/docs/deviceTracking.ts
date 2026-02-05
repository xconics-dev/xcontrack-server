import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  deviceTrackingQueryZodSchema,
  deviceTrackingResponseZodSchema,
  deviceTrackingZodSchema,
} from "../validators/deviceTracking/index.js";
import { z } from "../validators/index.js";

export const deviceTrackingRegistry = new OpenAPIRegistry();

// Components
deviceTrackingRegistry.register("deviceTracking", deviceTrackingZodSchema);
// Components
deviceTrackingRegistry.register(
  "deviceTrackingResponse",
  deviceTrackingResponseZodSchema
);

// Paths (describe each route once)

// Create deviceTracking
deviceTrackingRegistry.registerPath({
  tags: ["deviceTracking"],
  method: "post",
  path: "/deviceTracking/create",
  summary: "Create deviceTracking",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    body: {
      content: {
        "application/json": { schema: z.object({ packet: z.string() }) },
      },
    },
  },
  responses: {
    201: {
      description: "Returns id of deviceTracking created in db.",
      content: {
        "application/json": {
          schema: z.object({ data: z.uuid(), message: z.string() }),
        },
      },
    },
  },
});

// list deviceTracking
deviceTrackingRegistry.registerPath({
  tags: ["deviceTracking"],
  method: "get",
  path: "/deviceTracking/list",
  summary: "List deviceTracking",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    query: deviceTrackingQueryZodSchema,
  },
  responses: {
    200: {
      description: "Returns list of deviceTracking from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: z.array(deviceTrackingResponseZodSchema),
            message: z.string(),
          }),
        },
      },
    },
  },
});
