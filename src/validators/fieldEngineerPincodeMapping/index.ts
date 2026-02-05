import { z } from "../index.js";
import { extraFields, uuidZodSchemaGen } from "../common/index.js";

/* ================= CREATE ================= */

export const fieldEngineerPincodeMappingZodSchema = z.object({
  fieldEngineerId: uuidZodSchemaGen("field engineer id"),

  mappingPincode: z
    .string({ error: "Please enter mapping pincode" })
    .trim()
    .min(1, { error: "Please enter mapping pincode" }),

  state: z
    .string({ error: "Please enter state" })
    .trim()
    .min(1, { error: "Please enter state" }),

  district: z
    .string({ error: "Please enter district" })
    .trim()
    .min(1, { error: "Please enter district" }),

  isActive: z.boolean({ error: "Please enter active flag" }).optional(),
});

/* ================= UPDATE ================= */

export const fieldEngineerPincodeMappingUpdateZodSchema =
  fieldEngineerPincodeMappingZodSchema.partial();

/* ================= TYPES ================= */

export type FieldEngineerPincodeMappingZodType = z.infer<
  typeof fieldEngineerPincodeMappingZodSchema
>;

export type FieldEngineerPincodeMappingUpdateZodType = z.infer<
  typeof fieldEngineerPincodeMappingUpdateZodSchema
>;

/* ================= RESPONSE ================= */

export const fieldEngineerPincodeMappingResponseZodSchema =
  fieldEngineerPincodeMappingZodSchema.extend({
    id: uuidZodSchemaGen("id"),
    ...extraFields,
  });
