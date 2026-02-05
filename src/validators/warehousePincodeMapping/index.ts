import { z } from "../index.js";
import { extraFields, uuidZodSchemaGen } from "../common/index.js";

/* ================= CREATE ================= */

export const warehousePincodeMappingZodSchema = z.object({
  warehouseId: uuidZodSchemaGen("warehouse id"),

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

export const warehousePincodeMappingUpdateZodSchema =
  warehousePincodeMappingZodSchema.partial();

/* ================= TYPES ================= */

export type WarehousePincodeMappingZodType = z.infer<
  typeof warehousePincodeMappingZodSchema
>;
export type WarehousePincodeMappingUpdateZodType = z.infer<
  typeof warehousePincodeMappingUpdateZodSchema
>;

/* ================= RESPONSE ================= */

export const warehousePincodeMappingResponseZodSchema =
  warehousePincodeMappingZodSchema.extend({
    id: uuidZodSchemaGen("id"),
    ...extraFields,
  });
