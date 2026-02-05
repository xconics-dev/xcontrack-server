import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  warehousePincodeMappingResponseZodSchema,
  warehousePincodeMappingUpdateZodSchema,
  warehousePincodeMappingZodSchema,
} from "../validators/warehousePincodeMapping/index.js";
import { z } from "../validators/index.js";
import { commonQueryParamsZodSchema } from "../validators/common/index.js";

export const warehousePincodeMappingRegistry = new OpenAPIRegistry();

// Components
warehousePincodeMappingRegistry.register(
  "warehousePincodeMapping",
  warehousePincodeMappingZodSchema
);
// Components
warehousePincodeMappingRegistry.register(
  "warehousePincodeMappingResponse",
  warehousePincodeMappingResponseZodSchema
);
// Components
warehousePincodeMappingRegistry.register(
  "warehousePincodeMappingUpdate",
  warehousePincodeMappingUpdateZodSchema
);

// Paths (describe each route once)

// Create warehousePincodeMapping
warehousePincodeMappingRegistry.registerPath({
  tags: ["warehousePincodeMapping"],
  method: "post",
  path: "/warehousePincodeMapping/create",
  summary: "Create warehousePincodeMapping",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    body: {
      content: {
        "application/json": { schema: warehousePincodeMappingZodSchema },
      },
    },
  },
  responses: {
    201: {
      description: "Returns id of warehousePincodeMapping created in db.",
      content: {
        "application/json": {
          schema: z.object({ data: z.uuid(), message: z.string() }),
        },
      },
    },
  },
});
// update warehousePincodeMapping
warehousePincodeMappingRegistry.registerPath({
  tags: ["warehousePincodeMapping"],
  method: "put",
  path: "/warehousePincodeMapping/update/{id}",
  summary: "update warehousePincodeMapping",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ id: z.uuid() }),
    body: {
      content: {
        "application/json": {
          schema: warehousePincodeMappingUpdateZodSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Returns id of warehousePincodeMapping updated in db.",
      content: {
        "application/json": {
          schema: z.object({ data: z.uuid(), message: z.string() }),
        },
      },
    },
  },
});

// list warehousePincodeMapping
warehousePincodeMappingRegistry.registerPath({
  tags: ["warehousePincodeMapping"],
  method: "get",
  path: "/warehousePincodeMapping/list",
  summary: "List warehousePincodeMapping",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    query: commonQueryParamsZodSchema,
  },
  responses: {
    200: {
      description: "Returns list of warehousePincodeMapping from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: z.array(warehousePincodeMappingResponseZodSchema),
            message: z.string(),
            maxPage: z.number(),
          }),
        },
      },
    },
  },
});
// read warehousePincodeMapping
warehousePincodeMappingRegistry.registerPath({
  tags: ["warehousePincodeMapping"],
  method: "get",
  path: "/warehousePincodeMapping/read/{id}",
  summary: "read warehousePincodeMapping",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {
    params: z.object({ id: z.uuid() }),
  },
  responses: {
    200: {
      description: "Returns read of warehousePincodeMapping from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: warehousePincodeMappingResponseZodSchema,
            message: z.string(),
          }),
        },
      },
    },
  },
});
// delete warehousePincodeMapping
warehousePincodeMappingRegistry.registerPath({
  tags: ["warehousePincodeMapping"],
  method: "delete",
  path: "/warehousePincodeMapping/delete/{id}",
  summary: "Delete warehousePincodeMapping",
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
