import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  installationRequisitionQueryZodSchema,
  installationRequisitionRequestQueryZodSchema,
  installationRequisitionRequestResponseZodSchema,
  installationRequisitionResponseZodSchema,
  installationRequisitionUpdateZodSchema,
  installationRequisitionZodSchema,
} from "../validators/installationRequisition/index.js";
import { z } from "../validators/index.js";
import { commonQueryParamsZodSchema } from "../validators/common/index.js";

export const installationRequisitionRegistry = new OpenAPIRegistry();

// Components
installationRequisitionRegistry.register(
  "installationRequisition",
  installationRequisitionZodSchema
);
// Components
installationRequisitionRegistry.register(
  "installationRequisitionResponse",
  installationRequisitionResponseZodSchema
);
// Components
installationRequisitionRegistry.register(
  "installationRequisitionUpdate",
  installationRequisitionUpdateZodSchema
);

// Paths (describe each route once)

// Create installationRequisition
installationRequisitionRegistry.registerPath({
  tags: ["installationRequisition"],
  method: "post",
  path: "/installationRequisition/create",
  summary: "Create installationRequisition",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    body: {
      content: {
        "application/json": { schema: installationRequisitionZodSchema },
      },
    },
  },
  responses: {
    201: {
      description: "Returns id of installationRequisition created in db.",
      content: {
        "application/json": {
          schema: z.object({ data: z.uuid(), message: z.string() }),
        },
      },
    },
  },
});
// update installationRequisition
installationRequisitionRegistry.registerPath({
  tags: ["installationRequisition"],
  method: "put",
  path: "/installationRequisition/update/{id}",
  summary: "update installationRequisition",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ id: z.uuid() }),
    body: {
      content: {
        "application/json": { schema: installationRequisitionUpdateZodSchema },
      },
    },
  },
  responses: {
    200: {
      description: "Returns id of installationRequisition updated in db.",
      content: {
        "application/json": {
          schema: z.object({ data: z.uuid(), message: z.string() }),
        },
      },
    },
  },
});
// accept installationRequisition request
installationRequisitionRegistry.registerPath({
  tags: ["installationRequisition"],
  method: "put",
  path: "/installationRequisition/request/accept/{id}",
  summary: "accept installationRequisition request",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ id: z.uuid() }),
    body: {
      content: {
        "application/json": { schema: installationRequisitionUpdateZodSchema },
      },
    },
  },
  responses: {
    200: {
      description:
        "Returns id of accepted installationRequisition request updated in db.",
      content: {
        "application/json": {
          schema: z.object({ data: z.uuid(), message: z.string() }),
        },
      },
    },
  },
});

// reject installationRequisition request
installationRequisitionRegistry.registerPath({
  tags: ["installationRequisition"],
  method: "put",
  path: "/installationRequisition/request/reject/{id}",
  summary: "reject installationRequisition request",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ id: z.uuid() }),
    body: {
      content: {
        "application/json": { schema: installationRequisitionUpdateZodSchema },
      },
    },
  },
  responses: {
    200: {
      description:
        "Returns id of rejected installationRequisition request updated in db.",
      content: {
        "application/json": {
          schema: z.object({
            data: z.uuid(),
            message: z.string(),
            engineerAssigned: z.boolean(),
          }),
        },
      },
    },
  },
});

// list installationRequisition
installationRequisitionRegistry.registerPath({
  tags: ["installationRequisition"],
  method: "get",
  path: "/installationRequisition/list",
  summary: "List installationRequisition",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    query: installationRequisitionQueryZodSchema,
  },
  responses: {
    200: {
      description: "Returns list of installationRequisition from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: z.array(installationRequisitionResponseZodSchema),
            message: z.string(),
            maxPage: z.number(),
          }),
        },
      },
    },
  },
});
// list installationRequisition requests
installationRequisitionRegistry.registerPath({
  tags: ["installationRequisition"],
  method: "get",
  path: "/installationRequisition/list/requests",
  summary: "List installationRequisition requests",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    query: installationRequisitionRequestQueryZodSchema,
  },
  responses: {
    200: {
      description: "Returns list of installationRequisition requests from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: z.array(installationRequisitionRequestResponseZodSchema),
            message: z.string(),
            maxPage: z.number(),
          }),
        },
      },
    },
  },
});
// read installationRequisition
installationRequisitionRegistry.registerPath({
  tags: ["installationRequisition"],
  method: "get",
  path: "/installationRequisition/read/{id}",
  summary: "read installationRequisition",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ id: z.uuid() }),
  },
  responses: {
    200: {
      description: "Returns read of installationRequisition from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: installationRequisitionResponseZodSchema,
            message: z.string(),
          }),
        },
      },
    },
  },
});
// delete installationRequisition
installationRequisitionRegistry.registerPath({
  tags: ["installationRequisition"],
  method: "delete",
  path: "/installationRequisition/delete/{id}",
  summary: "Delete installationRequisition",
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
