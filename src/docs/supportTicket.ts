import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  supportTicketQueryZodSchema,
  supportTicketRequestQueryZodSchema,
  supportTicketRequestResponseZodSchema,
  supportTicketResponseZodSchema,
  supportTicketUpdateZodSchema,
  supportTicketZodSchema,
} from "../validators/supportTicket/index.js";
import { z } from "../validators/index.js";

export const supportTicketRegistry = new OpenAPIRegistry();

// Components
supportTicketRegistry.register("supportTicket", supportTicketZodSchema);
// Components
supportTicketRegistry.register(
  "supportTicketResponse",
  supportTicketResponseZodSchema
);
// Components
supportTicketRegistry.register(
  "supportTicketUpdate",
  supportTicketUpdateZodSchema
);

// Paths (describe each route once)

// Create supportTicket
supportTicketRegistry.registerPath({
  tags: ["supportTicket"],
  method: "post",
  path: "/supportTicket/create",
  summary: "Create supportTicket",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    body: {
      content: {
        "application/json": { schema: supportTicketZodSchema },
      },
    },
  },
  responses: {
    201: {
      description: "Returns id of supportTicket created in db.",
      content: {
        "application/json": {
          schema: z.object({ data: z.uuid(), message: z.string() }),
        },
      },
    },
  },
});
// update supportTicket
supportTicketRegistry.registerPath({
  tags: ["supportTicket"],
  method: "put",
  path: "/supportTicket/update/{id}",
  summary: "update supportTicket",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ id: z.uuid() }),
    body: {
      content: {
        "application/json": { schema: supportTicketUpdateZodSchema },
      },
    },
  },
  responses: {
    200: {
      description: "Returns id of supportTicket updated in db.",
      content: {
        "application/json": {
          schema: z.object({ data: z.uuid(), message: z.string() }),
        },
      },
    },
  },
});
// accept supportTicket request
supportTicketRegistry.registerPath({
  tags: ["supportTicket"],
  method: "put",
  path: "/supportTicket/request/accept/{id}",
  summary: "accept supportTicket request",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ id: z.uuid() }),
    body: {
      content: {
        "application/json": { schema: supportTicketUpdateZodSchema },
      },
    },
  },
  responses: {
    200: {
      description:
        "Returns id of accepted supportTicket request updated in db.",
      content: {
        "application/json": {
          schema: z.object({ data: z.uuid(), message: z.string() }),
        },
      },
    },
  },
});

// reject supportTicket request
supportTicketRegistry.registerPath({
  tags: ["supportTicket"],
  method: "put",
  path: "/supportTicket/request/reject/{id}",
  summary: "reject supportTicket request",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ id: z.uuid() }),
    body: {
      content: {
        "application/json": { schema: supportTicketUpdateZodSchema },
      },
    },
  },
  responses: {
    200: {
      description:
        "Returns id of rejected supportTicket request updated in db.",
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

// list supportTicket
supportTicketRegistry.registerPath({
  tags: ["supportTicket"],
  method: "get",
  path: "/supportTicket/list",
  summary: "List supportTicket",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    query: supportTicketQueryZodSchema,
  },
  responses: {
    200: {
      description: "Returns list of supportTicket from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: z.array(supportTicketResponseZodSchema),
            message: z.string(),
            maxPage: z.number(),
          }),
        },
      },
    },
  },
});
// list supportTicket requests
supportTicketRegistry.registerPath({
  tags: ["supportTicket"],
  method: "get",
  path: "/supportTicket/list/requests",
  summary: "List supportTicket requests",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    query: supportTicketRequestQueryZodSchema,
  },
  responses: {
    200: {
      description: "Returns list of supportTicket requests from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: z.array(supportTicketRequestResponseZodSchema),
            message: z.string(),
            maxPage: z.number(),
          }),
        },
      },
    },
  },
});
// read supportTicket
supportTicketRegistry.registerPath({
  tags: ["supportTicket"],
  method: "get",
  path: "/supportTicket/read/{id}",
  summary: "read supportTicket",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ id: z.uuid() }),
  },
  responses: {
    200: {
      description: "Returns read of supportTicket from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: supportTicketResponseZodSchema,
            message: z.string(),
          }),
        },
      },
    },
  },
});
// delete supportTicket
supportTicketRegistry.registerPath({
  tags: ["supportTicket"],
  method: "delete",
  path: "/supportTicket/delete/{id}",
  summary: "Delete supportTicket",
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
