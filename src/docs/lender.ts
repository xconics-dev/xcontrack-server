import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  lenderResponseZodSchema,
  lenderUpdateZodSchema,
  lenderZodSchema,
} from "../validators/lender/index.js";
import { z } from "../validators/index.js";
import { commonQueryParamsZodSchema } from "../validators/common/index.js";

export const lenderRegistry = new OpenAPIRegistry();

// Components
lenderRegistry.register("lender", lenderZodSchema);
// Components
lenderRegistry.register("lenderResponse", lenderResponseZodSchema);
// Components
lenderRegistry.register("lenderUpdate", lenderUpdateZodSchema);

// Paths (describe each route once)

// Create lender
lenderRegistry.registerPath({
  tags: ["lender"],
  method: "post",
  path: "/lender/create",
  summary: "Create lender",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    body: {
      content: {
        "application/json": { schema: lenderZodSchema },
      },
    },
  },
  responses: {
    201: {
      description: "Returns id of lender created in db.",
      content: {
        "application/json": {
          schema: z.object({ data: z.uuid(), message: z.string() }),
        },
      },
    },
  },
});
// update lender
lenderRegistry.registerPath({
  tags: ["lender"],
  method: "put",
  path: "/lender/update/{id}",
  summary: "update lender",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ id: z.uuid() }),
    body: {
      content: {
        "application/json": { schema: lenderUpdateZodSchema },
      },
    },
  },
  responses: {
    200: {
      description: "Returns id of lender updated in db.",
      content: {
        "application/json": {
          schema: z.object({ data: z.uuid(), message: z.string() }),
        },
      },
    },
  },
});

// list lender
lenderRegistry.registerPath({
  tags: ["lender"],
  method: "get",
  path: "/lender/list",
  summary: "List lender",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    query: commonQueryParamsZodSchema,
  },
  responses: {
    200: {
      description: "Returns list of lender from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: z.array(lenderResponseZodSchema),
            message: z.string(),
            maxPage: z.number(),
          }),
        },
      },
    },
  },
});
// read lender
lenderRegistry.registerPath({
  tags: ["lender"],
  method: "get",
  path: "/lender/read/{id}",
  summary: "read lender",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ id: z.uuid() }),
  },
  responses: {
    200: {
      description: "Returns read of lender from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: lenderResponseZodSchema,
            message: z.string(),
          }),
        },
      },
    },
  },
});
// delete lender
lenderRegistry.registerPath({
  tags: ["lender"],
  method: "delete",
  path: "/lender/delete/{id}",
  summary: "Delete lender",
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
