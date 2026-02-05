import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  FieldEngineerLocationLogResponseZodSchema,
  FieldEngineerLocationLogZodSchema,
} from "../validators/fieldEngineerLocationLog/index.js";
import { z } from "../validators/index.js";
import { commonQueryParamsZodSchema } from "../validators/common/index.js";

export const fieldEngineerLocationLogRegistry = new OpenAPIRegistry();

// Components
fieldEngineerLocationLogRegistry.register(
  "fieldEngineerLocationLog",
  FieldEngineerLocationLogZodSchema
);
// Components
fieldEngineerLocationLogRegistry.register(
  "fieldEngineerLocationLogResponse",
  FieldEngineerLocationLogResponseZodSchema
);

// Paths (describe each route once)

// Create fieldEngineerLocationLog
fieldEngineerLocationLogRegistry.registerPath({
  tags: ["fieldEngineerLocationLog"],
  method: "post",
  path: "/fieldEngineerLocationLog/create",
  summary: "Create fieldEngineerLocationLog",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    body: {
      content: {
        "application/json": { schema: FieldEngineerLocationLogZodSchema },
      },
    },
  },
  responses: {
    201: {
      description: "Returns id of fieldEngineerLocationLog created in db.",
      content: {
        "application/json": {
          schema: z.object({ data: z.uuid(), message: z.string() }),
        },
      },
    },
  },
});

// list fieldEngineerLocationLog
fieldEngineerLocationLogRegistry.registerPath({
  tags: ["fieldEngineerLocationLog"],
  method: "get",
  path: "/fieldEngineerLocationLog/list/{id}",
  summary: "List fieldEngineerLocationLog",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    query: commonQueryParamsZodSchema.pick({ offset: true, limit: true }),
    params: z.object({ id: z.uuid() }),
  },
  responses: {
    200: {
      description: "Returns list of fieldEngineerLocationLog from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: z.array(FieldEngineerLocationLogResponseZodSchema),
            message: z.string(),
            maxPage: z.number(),
          }),
        },
      },
    },
  },
});

// delete fieldEngineerLocationLog
fieldEngineerLocationLogRegistry.registerPath({
  tags: ["fieldEngineerLocationLog"],
  method: "delete",
  path: "/fieldEngineerLocationLog/delete/{id}",
  summary: "Delete fieldEngineerLocationLog",
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
