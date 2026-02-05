import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  fieldEngineerQueryZodSchema,
  fieldEngineerResponseZodSchema,
  fieldEngineerUpdateZodSchema,
  fieldEngineerZodSchema,
} from "../validators/fieldEngineer/index.js";
import { z } from "../validators/index.js";
import { commonQueryParamsZodSchema } from "../validators/common/index.js";

export const fieldEngineerRegistry = new OpenAPIRegistry();

// Components
fieldEngineerRegistry.register("fieldEngineer", fieldEngineerZodSchema);
// Components
fieldEngineerRegistry.register(
  "fieldEngineerResponse",
  fieldEngineerResponseZodSchema
);
// Components
fieldEngineerRegistry.register(
  "fieldEngineerUpdate",
  fieldEngineerUpdateZodSchema
);

// Paths (describe each route once)

// Create fieldEngineer
fieldEngineerRegistry.registerPath({
  tags: ["fieldEngineer"],
  method: "post",
  path: "/fieldEngineer/create",
  summary: "Create fieldEngineer",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    body: {
      content: {
        "application/json": { schema: fieldEngineerZodSchema },
      },
    },
  },
  responses: {
    201: {
      description: "Returns id of fieldEngineer created in db.",
      content: {
        "application/json": {
          schema: z.object({ data: z.uuid(), message: z.string() }),
        },
      },
    },
  },
});
// update fieldEngineer
fieldEngineerRegistry.registerPath({
  tags: ["fieldEngineer"],
  method: "put",
  path: "/fieldEngineer/update/{id}",
  summary: "update fieldEngineer",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ id: z.uuid() }),
    body: {
      content: {
        "application/json": { schema: fieldEngineerUpdateZodSchema },
      },
    },
  },
  responses: {
    200: {
      description: "Returns id of fieldEngineer updated in db.",
      content: {
        "application/json": {
          schema: z.object({ data: z.uuid(), message: z.string() }),
        },
      },
    },
  },
});

// list fieldEngineer
fieldEngineerRegistry.registerPath({
  tags: ["fieldEngineer"],
  method: "get",
  path: "/fieldEngineer/list",
  summary: "List fieldEngineer",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    query: fieldEngineerQueryZodSchema,
  },
  responses: {
    200: {
      description: "Returns list of fieldEngineer from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: z.array(fieldEngineerResponseZodSchema),
            message: z.string(),
            maxPage: z.number(),
          }),
        },
      },
    },
  },
});
// read fieldEngineer
fieldEngineerRegistry.registerPath({
  tags: ["fieldEngineer"],
  method: "get",
  path: "/fieldEngineer/read/{id}",
  summary: "read fieldEngineer",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ id: z.uuid() }),
  },
  responses: {
    200: {
      description: "Returns read of fieldEngineer from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: fieldEngineerResponseZodSchema,
            message: z.string(),
          }),
        },
      },
    },
  },
});
// delete fieldEngineer
fieldEngineerRegistry.registerPath({
  tags: ["fieldEngineer"],
  method: "delete",
  path: "/fieldEngineer/delete/{id}",
  summary: "Delete fieldEngineer",
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
