import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  lenderBranchQueryZodSchema,
  lenderBranchResponseZodSchema,
  lenderBranchUpdateZodSchema,
  lenderBranchZodSchema,
} from "../validators/lenderBranch/index.js";
import { z } from "../validators/index.js";
import { commonQueryParamsZodSchema } from "../validators/common/index.js";

export const lenderBranchRegistry = new OpenAPIRegistry();

// Components
lenderBranchRegistry.register("lenderBranch", lenderBranchZodSchema);
// Components
lenderBranchRegistry.register(
  "lenderBranchResponse",
  lenderBranchResponseZodSchema
);
// Components
lenderBranchRegistry.register(
  "lenderBranchUpdate",
  lenderBranchUpdateZodSchema
);

// Paths (describe each route once)

// Create lenderBranch
lenderBranchRegistry.registerPath({
  tags: ["lenderBranch"],
  method: "post",
  path: "/lenderBranch/create",
  summary: "Create lenderBranch",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    body: {
      content: {
        "application/json": { schema: lenderBranchZodSchema },
      },
    },
  },
  responses: {
    201: {
      description: "Returns id of lenderBranch created in db.",
      content: {
        "application/json": {
          schema: z.object({ data: z.uuid(), message: z.string() }),
        },
      },
    },
  },
});
// update lenderBranch
lenderBranchRegistry.registerPath({
  tags: ["lenderBranch"],
  method: "put",
  path: "/lenderBranch/update/{id}",
  summary: "update lenderBranch",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ id: z.uuid() }),
    body: {
      content: {
        "application/json": { schema: lenderBranchUpdateZodSchema },
      },
    },
  },
  responses: {
    200: {
      description: "Returns id of lenderBranch updated in db.",
      content: {
        "application/json": {
          schema: z.object({ data: z.uuid(), message: z.string() }),
        },
      },
    },
  },
});

// list lenderBranch
lenderBranchRegistry.registerPath({
  tags: ["lenderBranch"],
  method: "get",
  path: "/lenderBranch/list",
  summary: "List lenderBranch",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    query: lenderBranchQueryZodSchema,
  },
  responses: {
    200: {
      description: "Returns list of lenderBranch from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: z.array(lenderBranchResponseZodSchema),
            message: z.string(),
            maxPage: z.number(),
          }),
        },
      },
    },
  },
});
// read lenderBranch
lenderBranchRegistry.registerPath({
  tags: ["lenderBranch"],
  method: "get",
  path: "/lenderBranch/read/{id}",
  summary: "read lenderBranch",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ id: z.uuid() }),
  },
  responses: {
    200: {
      description: "Returns read of lenderBranch from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: lenderBranchResponseZodSchema,
            message: z.string(),
          }),
        },
      },
    },
  },
});
// delete lenderBranch
lenderBranchRegistry.registerPath({
  tags: ["lenderBranch"],
  method: "delete",
  path: "/lenderBranch/delete/{id}",
  summary: "Delete lenderBranch",
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
