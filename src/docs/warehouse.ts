import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  warehouseQueryZodSchema,
  warehouseResponseZodSchema,
  warehouseUpdateZodSchema,
  warehouseZodSchema,
} from "../validators/warehouse/index.js";
import { z } from "../validators/index.js";
import { commonQueryParamsZodSchema } from "../validators/common/index.js";

export const warehouseRegistry = new OpenAPIRegistry();

// Components
warehouseRegistry.register("warehouse", warehouseZodSchema);
// Components
warehouseRegistry.register("warehouseResponse", warehouseResponseZodSchema);
// Components
warehouseRegistry.register("warehouseUpdate", warehouseUpdateZodSchema);

// Paths (describe each route once)

// Create warehouse
warehouseRegistry.registerPath({
  tags: ["warehouse"],
  method: "post",
  path: "/warehouse/create",
  summary: "Create warehouse",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    body: {
      content: {
        "application/json": { schema: warehouseZodSchema },
      },
    },
  },
  responses: {
    201: {
      description: "Returns id of warehouse created in db.",
      content: {
        "application/json": {
          schema: z.object({ data: z.uuid(), message: z.string() }),
        },
      },
    },
  },
});
// update warehouse
warehouseRegistry.registerPath({
  tags: ["warehouse"],
  method: "put",
  path: "/warehouse/update/{id}",
  summary: "update warehouse",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ id: z.uuid() }),
    body: {
      content: {
        "application/json": { schema: warehouseUpdateZodSchema },
      },
    },
  },
  responses: {
    200: {
      description: "Returns id of warehouse updated in db.",
      content: {
        "application/json": {
          schema: z.object({ data: z.uuid(), message: z.string() }),
        },
      },
    },
  },
});

// list warehouse
warehouseRegistry.registerPath({
  tags: ["warehouse"],
  method: "get",
  path: "/warehouse/list",
  summary: "List warehouse",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    query: warehouseQueryZodSchema,
  },
  responses: {
    200: {
      description: "Returns list of warehouse from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: z.array(warehouseResponseZodSchema),
            message: z.string(),
            maxPage: z.number(),
          }),
        },
      },
    },
  },
});
// read warehouse
warehouseRegistry.registerPath({
  tags: ["warehouse"],
  method: "get",
  path: "/warehouse/read/{id}",
  summary: "read warehouse",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ id: z.uuid() }),
  },
  responses: {
    200: {
      description: "Returns read of warehouse from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: warehouseResponseZodSchema,
            message: z.string(),
          }),
        },
      },
    },
  },
});
// delete warehouse
warehouseRegistry.registerPath({
  tags: ["warehouse"],
  method: "delete",
  path: "/warehouse/delete/{id}",
  summary: "Delete warehouse",
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
