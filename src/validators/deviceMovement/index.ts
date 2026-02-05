import { z } from "../index.js";
import { extraFields, uuidZodSchemaGen } from "../common/index.js";
import { DeviceZodSchema } from "../device/index.js";
import { warehouseZodSchema } from "../warehouse/index.js";
import { installationRequisitionZodSchema } from "../installationRequisition/index.js";
import { fieldEngineerZodSchema } from "../fieldEngineer/index.js";

/* ================= ENUMS ================= */

export const deviceMovementTypeZodSchema = z.enum(
  ["PROD_TO_WH", "WH_TO_ENGINEER", "ENGINEER_TO_VEHICLE"],
  { error: "Please enter a valid movement type" }
);

export const movementEntityTypeZodSchema = z.enum(
  ["PRODUCTION_WAREHOUSE", "WAREHOUSE", "ENGINEER", "VEHICLE"],
  { error: "Please enter a valid entity type" }
);

export const deviceMovementStatusZodSchema = z.enum(
  ["IN_TRANSIT", "RECEIVED", "CANCELLED"],
  { error: "Please enter a valid movement status" }
);

/* ================= CREATE ================= */

export const deviceMovementZodSchema = z.object({
  deviceId: uuidZodSchemaGen("device id"),

  movementType: deviceMovementTypeZodSchema,

  fromEntityType: movementEntityTypeZodSchema,
  fromEntityWarehouseId: uuidZodSchemaGen("from warehouse id").optional(),
  fromEntityFieldEngineerId: uuidZodSchemaGen(
    "from field engineer id"
  ).optional(),
  fromEntityVehicleId: uuidZodSchemaGen("from vehicle id").optional(),

  toEntityType: movementEntityTypeZodSchema,
  toEntityWarehouseId: uuidZodSchemaGen("to warehouse id").optional(),
  toEntityFieldEngineerId: uuidZodSchemaGen("to field engineer id").optional(),
  toEntityVehicleId: uuidZodSchemaGen("to vehicle id").optional(),

  movementDate: z.coerce.date({ error: "Please enter movement date" }),

  dispatchedAt: z.coerce
    .date({ error: "Please enter dispatched date" })
    .optional(),

  receivedAt: z.coerce.date({ error: "Please enter received date" }).optional(),

  movementStatus: deviceMovementStatusZodSchema.optional(),

  handoverProof: z
    .string({ error: "Please enter handover proof" })
    .trim()
    .min(1, { error: "Please enter handover proof" })
    .optional(),

  remarks: z
    .string({ error: "Please enter remarks" })
    .trim()
    .min(1, { error: "Please enter remarks" })
    .optional(),

  createdById: uuidZodSchemaGen("created by id").optional(),
});

/* ================= UPDATE ================= */

export const deviceMovementUpdateZodSchema = deviceMovementZodSchema.partial();

/* ================= TYPES ================= */

export type DeviceMovementZodType = z.infer<typeof deviceMovementZodSchema>;

export type DeviceMovementUpdateZodType = z.infer<
  typeof deviceMovementUpdateZodSchema
>;

/* ================= RESPONSE ================= */

const devicePartResponseSchema = DeviceZodSchema.pick({
  imei: true,
  qr: true,
});
export const warehousePartResponseSchema = warehouseZodSchema.pick({
  warehouseCode: true,
  address: true,
  latitude: true,
  longitude: true,
});
const vehiclePartResponseSchema = installationRequisitionZodSchema.pick({
  vehicleNo: true,
});
const fieldEngineerPartResponseSchema = fieldEngineerZodSchema.pick({
  engineerName: true,
  engineerCode: true,
});

export const deviceMovementResponseZodSchema = deviceMovementZodSchema.extend({
  id: uuidZodSchemaGen("id"),
  ...extraFields,
  device: devicePartResponseSchema,
  fromEntityWarehouse: warehousePartResponseSchema.nullable(),
  toEntityWarehouse: warehousePartResponseSchema.nullable(),
  fromEntityFieldEngineer: fieldEngineerPartResponseSchema.nullable(),
  toEntityFieldEngineer: fieldEngineerPartResponseSchema.nullable(),
  fromEntityVehicle: vehiclePartResponseSchema.nullable(),
  toEntityVehicle: vehiclePartResponseSchema.nullable(),
});

const warehouseListPartResponseSchema = warehouseZodSchema.pick({
  warehouseCode: true,
});
const vehicleListPartResponseSchema = installationRequisitionZodSchema.pick({
  vehicleNo: true,
});
const fieldEngineerListPartResponseSchema = fieldEngineerZodSchema.pick({
  engineerCode: true,
});

export const deviceMovementListResponseZodSchema =
  deviceMovementZodSchema.safeExtend({
    id: uuidZodSchemaGen("id"),
    ...extraFields,
    device: devicePartResponseSchema,
    fromEntityWarehouse: warehouseListPartResponseSchema.nullable(),
    toEntityWarehouse: warehouseListPartResponseSchema.nullable(),
    fromEntityFieldEngineer: fieldEngineerListPartResponseSchema.nullable(),
    toEntityFieldEngineer: fieldEngineerListPartResponseSchema.nullable(),
    fromEntityVehicle: vehicleListPartResponseSchema.nullable(),
    toEntityVehicle: vehicleListPartResponseSchema.nullable(),
  });
