import { z } from "zod";
import {
  InstallationDeviceType,
  InstallationStatus,
} from "../../generated/prisma/enums.js";
import { DeviceZodSchema } from "../device/index.js";
import { lenderZodSchema } from "../lender/index.js";
import { lenderBranchZodSchema } from "../lenderBranch/index.js";
import { aggregatorZodSchema } from "../aggregator/index.js";
import { extraFields, uuidZodSchemaGen } from "../common/index.js";
import Config from "../../config/index.js";

export type packetType = "NRM" | "HLT" | "ALT";

// Simple Zod schemas matching your VehicleData type exactly
export const vehicleDataZodSchema = z.object({
  id: z.string(),
  requisitionNo: z.string(),
  vehicleNo: z.string(),
  customerName: z.string(),
  customerMobile: z.string(),
  status: z.enum(InstallationStatus),
  deviceType: z.enum(InstallationDeviceType),
  device: DeviceZodSchema,
  lender: lenderZodSchema.optional(),
  branch: lenderBranchZodSchema.optional(),
  assignedAggregator: aggregatorZodSchema.optional(),
});

export const vehicleAlertPacketZodSchema = z.object({
  sln: z.number(),
  packet_type: z.enum(["NRM", "HLT", "ALT"]),
  imei: z.string(),
  packet: z.string(),
  time_stamp_server: z.date(),
  tamper: z.boolean(),
  latitude: z.number(),
  longitude: z.number(),
  main_power: z.boolean(),
  mqtt_topic: z.string().optional(),
  epoch_time: z.number(),
});


export const vehicleHealthPacketZodSchema = z.object({
  sln: z.bigint().optional(),
  packet_type: z.enum(["NRM", "HLM", "ALT"]),
  imei: z.string(),
  packet: z.string(),
  time_stamp_server: z.date(),
  connection: z.boolean(),
  battery_voltage: z.bigint(),
  main_power: z.boolean(),
  latitude: z.number(),
  longitude: z.number(),
  epoch_time: z.number(),
});



export const vehicleDataPacketZodSchema = z.object({
  sln: z.number(),
  packet_type: z.enum(["NRM", "HLM", "ALT"]),
  imei: z.string(),
  packet: z.string(),
  time_stamp_server: z.date(),
  processed: z.boolean(),
  mqtt_topic: z.string().optional(),
  battery_voltage: z.bigint().optional(),
  main_power: z.boolean().optional(),
  epoch_time: z.number().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  satelite: z.string().optional(),
  speed: z.string().optional(),
  cog: z.string().optional(),
  network_strength: z.number().optional(),
  altitude: z.string().optional(),
  custom_field1: z.string().optional(),
  custom_field2: z.string().optional(),
  custom_field3: z.string().optional(),
  custom_field4: z.string().optional(),
  custom_field5: z.string().optional(),
  column_field6: z.string().optional(),
});

/* ================= TYPES ================= */

export type VehicleZodType = z.infer<typeof vehicleDataZodSchema>;
export type VehicleAlertPacketZodType = z.infer<
  typeof vehicleAlertPacketZodSchema
>;
export type VehicleHealthPacketZodType = z.infer<
  typeof vehicleHealthPacketZodSchema
>;
export type VehicleDataPacketZodType = z.infer<
  typeof vehicleDataPacketZodSchema
>;

// Query schemas
export const VehcileAlertPacketQueryZodSchema = z.object({
  offset: z.coerce.number().min(0).default(0).optional(),
  limit: z.coerce.number().min(1).default(Config.PAGE_ITEM_COUNT).optional(),
  search: z.string().optional(),
  imei: z.string().optional(),
});


export const VehcileDataPacketQueryZodSchema = z.object({
  offset: z.coerce.number().min(0).default(0).optional(),
  limit: z.coerce.number().min(1).default(Config.PAGE_ITEM_COUNT).optional(),
  search: z.string().optional(),
  imei: z.string().optional(),
});

export const VehcileHealthPacketQueryZodSchema = z.object({
  offset: z.coerce.number().min(0).default(0).optional(),
  limit: z.coerce.number().min(1).default(Config.PAGE_ITEM_COUNT).optional(),
  search: z.string().optional(),
  imei: z.string().optional(),
});

/* ================= RESPONSE ================= */

export const vehicleResponseZodSchema = vehicleDataZodSchema.extend({
  id: uuidZodSchemaGen("id"),
  ...extraFields,
});

export const vechileAlertPacketResponseZodSchema =
  vehicleAlertPacketZodSchema.extend({
    id: uuidZodSchemaGen("id"),
    vehicleNo: z.string().optional(),
    ...extraFields,
  });

export const vechileHealthPacketResponseZodSchema =
  vehicleHealthPacketZodSchema.extend({
    id: uuidZodSchemaGen("id"),
    ...extraFields,
  });

export const vechileDataPacketResponseZodSchema =
  vehicleDataPacketZodSchema.extend({
    id: uuidZodSchemaGen("id"),
    ...extraFields,
  });
