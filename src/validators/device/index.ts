import {
  commonQueryParamsZodSchema,
  extraFields,
  uuidZodSchemaGen,
} from "../common/index.js";
import { z } from "../index.js";

export const locationType = z.enum(
  ["PRODUCTION_FLOOR", "WAREHOUSE", "FIELD_ENGINEER", "VEHICLE"],
  { error: "Please enter a valid location type!" }
);

export const DeviceZodSchema = z.object({
  imei: z
    .string({ error: "Please enter a valid imei" })
    .trim()
    .min(1, { error: "Please enter a valid imei" }),
  qr: z
    .string({ error: "Please enter a valid qr" })
    .trim()
    .min(1, { error: "Please enter a valid qr" }),
  locationType: locationType,
  locationProductionFloor: z
    .string({ error: "Please enter a valid qr" })
    .trim()
    .min(1, { error: "Please enter a valid qr" })
    .optional(),
  productionWarehouseId: uuidZodSchemaGen("production warehouse id"),
  installationRequisitionId: uuidZodSchemaGen("installation requisition id")
    .nullable()
    .optional(),
});

export const DeviceUpdateZodSchema = DeviceZodSchema.partial();

export type DeviceZodType = z.infer<typeof DeviceZodSchema>;
export type DeviceUpdateZodType = z.infer<typeof DeviceUpdateZodSchema>;

export const deviceResponseZodSchema = DeviceZodSchema.extend({
  id: uuidZodSchemaGen("id"),
  ...extraFields,
});

export const deviceQueryZodSchema = z.object({
  ...commonQueryParamsZodSchema.shape,
  locationType: locationType.optional(),
  fieldEngineerId: uuidZodSchemaGen("field engineer id").optional(),
});
