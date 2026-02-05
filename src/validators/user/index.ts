import { z } from "../index.js";
import Config from "../../config/index.js";
import { extraFields, uuidZodSchemaGen } from "../common/index.js";

export const userTypeZodSchema = z.enum(
  ["XCONICS", "AGGREGATOR", "LENDER", "FIELD_ENGINEER"],
  { error: "Please enter a valid user type" }
);

export const userZodSchema = z
  .object({
    email: z.email({ error: "Please enter a valid Email!" }),
    password: z
      .string({ error: "Please enter a valid password" })
      .trim()
      .min(Config.MIN_PASSWORD_LENGTH, {
        error: "Please enter a valid password",
      }),
    type: userTypeZodSchema,
    aggregatorId: uuidZodSchemaGen("aggregator id").optional(),
    lenderId: uuidZodSchemaGen("lender id").optional(),
    fieldEngineerId: uuidZodSchemaGen("field engineer id").optional(),
  })
  .refine(
    (user) =>
      (user.type === "XCONICS" &&
        !(user.aggregatorId || user.lenderId || user.fieldEngineerId)) ||
      (user.type === "LENDER" && user.lenderId) ||
      (user.type === "FIELD_ENGINEER" && user.fieldEngineerId) ||
      (user.type === "AGGREGATOR" && user.aggregatorId),
    { error: "Type and relation does not match." }
  );

export const userUpdateZodSchema = userZodSchema.partial();

export type userZodType = z.infer<typeof userZodSchema>;

export type userUpdateZodType = z.infer<typeof userUpdateZodSchema>;

export const userResponseZodSchema = userZodSchema.safeExtend({
  id: uuidZodSchemaGen("id"),
  ...extraFields,
});

export const userSigninZodSchema = userZodSchema.pick({
  email: true,
  password: true,
});
export type userSigninZodType = z.infer<typeof userSigninZodSchema>;
