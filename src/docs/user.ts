import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  userResponseZodSchema,
  userSigninZodSchema,
} from "../validators/user/index.js";
import { z } from "../validators/index.js";

export const userRegistry = new OpenAPIRegistry();

// Components
userRegistry.register("userSignin", userSigninZodSchema);
// Components
userRegistry.register("userResponse", userResponseZodSchema);
// Components

// Paths (describe each route once)

// signin user
userRegistry.registerPath({
  tags: ["user"],
  method: "post",
  path: "/user/signin",
  summary: "signin user",
  request: {
    body: {
      content: {
        "application/json": { schema: userSigninZodSchema },
      },
    },
  },
  responses: {
    200: {
      description: "Returns jwt token.",
      content: {
        "application/json": {
          schema: z.object({ data: z.string(), message: z.string() }),
        },
      },
    },
  },
});
// status user
userRegistry.registerPath({
  tags: ["user"],
  method: "get",
  path: "/user/status",
  summary: "Info of user",
  security: [{ bearerAuth: [] }], // 🔒 requires JWT
  request: {},
  responses: {
    200: {
      description: "Returns user info from db.",
      content: {
        "application/json": {
          schema: z.object({
            data: userResponseZodSchema,
            message: z.string(),
          }),
        },
      },
    },
  },
});
