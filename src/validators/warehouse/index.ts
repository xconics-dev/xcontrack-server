import { z } from "../index.js";
import {
  commonQueryParamsZodSchema,
  extraFields,
  uuidZodSchemaGen,
} from "../common/index.js";

/* ================= ENUMS ================= */

export const warehouseTypeZodSchema = z.enum(
  ["PRODUCTION", "LOCAL", "REGIONAL"],
  { error: "Please enter a valid warehouse type" }
);

export const warehouseOwnerTypeZodSchema = z.enum(["XCONICS", "AGGREGATOR"], {
  error: "Please enter a valid warehouse owner type",
});

export const warehouseStatusZodSchema = z.enum(["ACTIVE", "INACTIVE"], {
  error: "Please enter a valid warehouse status",
});

/* ================= CREATE ================= */

export const warehouseZodSchema = z.object({
  warehouseCode: z
    .string({ error: "Please enter warehouse code" })
    .trim()
    .min(1, { error: "Please enter warehouse code" }),

  warehouseName: z
    .string({ error: "Please enter warehouse name" })
    .trim()
    .min(1, { error: "Please enter warehouse name" }),

  warehouseType: warehouseTypeZodSchema,
  ownerType: warehouseOwnerTypeZodSchema,

  aggregatorId: uuidZodSchemaGen("aggregator id").optional(),

  address: z
    .string({ error: "Please enter address" })
    .trim()
    .min(1, { error: "Please enter address" }),

  state: z
    .string({ error: "Please enter state" })
    .trim()
    .min(1, { error: "Please enter state" }),

  district: z
    .string({ error: "Please enter district" })
    .trim()
    .min(1, { error: "Please enter district" }),

  pincode: z
    .string({ error: "Please enter pincode" })
    .trim()
    .min(1, { error: "Please enter pincode" }),

  latitude: z.coerce.number({ error: "Please enter latitude" }).optional(),
  longitude: z.coerce.number({ error: "Please enter longitude" }).optional(),

  contactPersonName: z
    .string({ error: "Please enter contact person name" })
    .trim()
    .min(1, { error: "Please enter contact person name" }),

  contactMobile: z
    .string({ error: "Please enter contact mobile" })
    .trim()
    .min(1, { error: "Please enter contact mobile" }),

  emailId: z.email({ error: "Please enter valid email" }).trim(),

  status: warehouseStatusZodSchema.optional(),

  remarks: z
    .string({ error: "Please enter remarks" })
    .trim()
    .min(1, { error: "Please enter remarks" })
    .optional(),
});

/* ================= UPDATE ================= */

export const warehouseUpdateZodSchema = warehouseZodSchema.partial();

/* ================= TYPES ================= */

export type WarehouseZodType = z.infer<typeof warehouseZodSchema>;
export type WarehouseUpdateZodType = z.infer<typeof warehouseUpdateZodSchema>;

/* ================= RESPONSE ================= */

export const warehouseResponseZodSchema = warehouseZodSchema.extend({
  id: uuidZodSchemaGen("id"),
  ...extraFields,
});

export const warehouseQueryZodSchema = z.object({
  ...commonQueryParamsZodSchema.shape,
  aggregatorId: z.uuid().nullable().optional(),
  warehouseOwnerType: z
    .union([warehouseOwnerTypeZodSchema, z.array(warehouseOwnerTypeZodSchema)])
    .optional(),
  warehouseType: z
    .union([warehouseTypeZodSchema, z.array(warehouseTypeZodSchema)])
    .optional(),
});
