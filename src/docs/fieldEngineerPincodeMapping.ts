import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  fieldEngineerPincodeMappingResponseZodSchema,
  fieldEngineerPincodeMappingUpdateZodSchema,
  fieldEngineerPincodeMappingZodSchema,
} from "../validators/fieldEngineerPincodeMapping/index.js";
import { z } from "../validators/index.js";
import { commonQueryParamsZodSchema } from "../validators/common/index.js";

export const fieldEngineerPincodeMappingRegistry = new OpenAPIRegistry();

// Components
fieldEngineerPincodeMappingRegistry.register(
  "fieldEngineerPincodeMapping",
  fieldEngineerPincodeMappingZodSchema
);
// Components
fieldEngineerPincodeMappingRegistry.register(
  "fieldEngineerPincodeMappingResponse",
  fieldEngineerPincodeMappingResponseZodSchema
);
// Components
fieldEngineerPincodeMappingRegistry.register(
  "fieldEngineerPincodeMappingUpdate",
  fieldEngineerPincodeMappingUpdateZodSchema
);

// Paths (describe each route once)

// Create fieldEngineerPincodeMapping
fieldEngineerPincodeMappingRegistry.registerPath({
  tags: ["fieldEngineerPincodeMapping"],
  method: "post",
  path: "/fieldEngineerPincodeMapping/create",
  summary: "Create fieldEngineerPincodeMapping",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    body: {
      content: {
        "application/json": { schema: fieldEngineerPincodeMappingZodSchema },
      },
    },
  },
  responses: {
    201: {
      description: "Returns id of fieldEngineerPincodeMapping created in db.",
      content: {
        "application/json": {
          schema: z.object({ data: z.uuid(), message: z.string() }),
        },
      },
    },
  },
});
// update fieldEngineerPincodeMapping
fieldEngineerPincodeMappingRegistry.registerPath({
  tags: ["fieldEngineerPincodeMapping"],
  method: "put",
  path: "/fieldEngineerPincodeMapping/update/{id}",
  summary: "update fieldEngineerPincodeMapping",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ id: z.uuid() }),
    body: {
      content: {
        "application/json": {
          schema: fieldEngineerPincodeMappingUpdateZodSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Returns id of fieldEngineerPincodeMapping updated in db.",
      content: {
        "application/json": {
          schema: z.object({ data: z.uuid(), message: z.string() }),
        },
      },
    },
  },
});

// list fieldEngineerPincodeMapping
fieldEngineerPincodeMappingRegistry.registerPath({
  tags: ["fieldEngineerPincodeMapping"],
  method: "get",
  path: "/fieldEngineerPincodeMapping/list",
  summary: "List fieldEngineerPincodeMapping",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    query: commonQueryParamsZodSchema,
  },
  responses: {
    200: {
      description: "Returns list of fieldEngineerPincodeMapping from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: z.array(fieldEngineerPincodeMappingResponseZodSchema),
            message: z.string(),
            maxPage: z.number(),
          }),
        },
      },
    },
  },
});
// read fieldEngineerPincodeMapping
fieldEngineerPincodeMappingRegistry.registerPath({
  tags: ["fieldEngineerPincodeMapping"],
  method: "get",
  path: "/fieldEngineerPincodeMapping/read/{id}",
  summary: "read fieldEngineerPincodeMapping",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ id: z.uuid() }),
  },
  responses: {
    200: {
      description: "Returns read of fieldEngineerPincodeMapping from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: fieldEngineerPincodeMappingResponseZodSchema,
            message: z.string(),
          }),
        },
      },
    },
  },
});
// delete fieldEngineerPincodeMapping
fieldEngineerPincodeMappingRegistry.registerPath({
  tags: ["fieldEngineerPincodeMapping"],
  method: "delete",
  path: "/fieldEngineerPincodeMapping/delete/{id}",
  summary: "Delete fieldEngineerPincodeMapping",
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

// engineerMappings fieldEngineerPincodeMapping
fieldEngineerPincodeMappingRegistry.registerPath({
  tags: ["fieldEngineerPincodeMapping"],
  method: "get",
  path: "/fieldEngineerPincodeMapping/engineer/{engineerId}",
  summary: "Get fieldEngineerPincodeMappings for a specific engineer",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ engineerId: z.string() }),
  },
  responses: {
    200: {
      description:
        "Returns list of fieldEngineerPincodeMappings for the specified engineer from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: z.array(fieldEngineerPincodeMappingResponseZodSchema),
            message: z.string(),
          }),
        },
      },
    },
  },
});