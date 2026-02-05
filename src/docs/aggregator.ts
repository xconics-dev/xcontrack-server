import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  aggregatorResponseZodSchema,
  aggregatorUpdateZodSchema,
  aggregatorZodSchema,
} from "../validators/aggregator/index.js";
import { z } from "../validators/index.js";
import { commonQueryParamsZodSchema } from "../validators/common/index.js";

export const aggregatorRegistry = new OpenAPIRegistry();

// Components
aggregatorRegistry.register("aggregator", aggregatorZodSchema);
// Components
aggregatorRegistry.register("aggregatorResponse", aggregatorResponseZodSchema);
// Components
aggregatorRegistry.register("aggregatorUpdate", aggregatorUpdateZodSchema);

// Paths (describe each route once)

// Create aggregator
aggregatorRegistry.registerPath({
  tags: ["aggregator"],
  method: "post",
  path: "/aggregator/create",
  summary: "Create aggregator",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    body: {
      content: {
        "application/json": { schema: aggregatorZodSchema },
      },
    },
  },
  responses: {
    201: {
      description: "Returns id of aggregator created in db.",
      content: {
        "application/json": {
          schema: z.object({ data: z.uuid(), message: z.string() }),
        },
      },
    },
  },
});
// update aggregator
aggregatorRegistry.registerPath({
  tags: ["aggregator"],
  method: "put",
  path: "/aggregator/update/{id}",
  summary: "update aggregator",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ id: z.uuid() }),
    body: {
      content: {
        "application/json": { schema: aggregatorUpdateZodSchema },
      },
    },
  },
  responses: {
    200: {
      description: "Returns id of aggregator updated in db.",
      content: {
        "application/json": {
          schema: z.object({ data: z.uuid(), message: z.string() }),
        },
      },
    },
  },
});

// list aggregator
aggregatorRegistry.registerPath({
  tags: ["aggregator"],
  method: "get",
  path: "/aggregator/list",
  summary: "List aggregator",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    query: commonQueryParamsZodSchema,
  },
  responses: {
    200: {
      description: "Returns list of aggregator from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: z.array(aggregatorResponseZodSchema),
            message: z.string(),
            maxPage: z.number(),
          }),
        },
      },
    },
  },
});
// read aggregator
aggregatorRegistry.registerPath({
  tags: ["aggregator"],
  method: "get",
  path: "/aggregator/read/{id}",
  summary: "read aggregator",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ id: z.uuid() }),
  },
  responses: {
    200: {
      description: "Returns read of aggregator from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: aggregatorResponseZodSchema,
            message: z.string(),
          }),
        },
      },
    },
  },
});
// delete aggregator
aggregatorRegistry.registerPath({
  tags: ["aggregator"],
  method: "delete",
  path: "/aggregator/delete/{id}",
  summary: "Delete aggregator",
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
