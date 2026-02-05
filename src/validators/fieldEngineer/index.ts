import { z } from "../index.js";
import {
  commonQueryParamsZodSchema,
  extraFields,
  uuidZodSchemaGen,
} from "../common/index.js";

/* ================= ENUMS ================= */

export const engineerEmploymentTypeZodSchema = z.enum(
  ["XCONICS", "AGGREGATOR"],
  { error: "Please enter a valid employment type" }
);

export const engineerStatusZodSchema = z.enum(
  ["ACTIVE", "INACTIVE", "ON_LEAVE"],
  { error: "Please enter a valid engineer status" }
);

export const engineerSkillZodSchema = z.enum(["GPS", "CAMERA", "ELECTRICAL"], {
  error: "Please enter a valid skill",
});

export const engineerIdProofTypeZodSchema = z.enum(["AADHAAR", "DL", "PAN"], {
  error: "Please enter a valid ID proof type",
});
export const engineerLoginStatusZodSchema = z.enum(
  ["LOGGED_IN", "LOGGED_OFF"],
  {
    error: "Please enter a valid ID proof type",
  }
);

/* ================= CREATE ================= */

export const fieldEngineerZodSchema = z.object({
  engineerCode: z
    .string({ error: "Please enter engineer code" })
    .trim()
    .min(1, { error: "Please enter engineer code" }),

  engineerName: z
    .string({ error: "Please enter engineer name" })
    .trim()
    .min(1, { error: "Please enter engineer name" }),

  mobileNo: z
    .string({ error: "Please enter mobile number" })
    .trim()
    .min(1, { error: "Please enter mobile number" }),

  emailId: z.email({ error: "Please enter valid email" }).trim(),

  aggregatorId: uuidZodSchemaGen("aggregator id").optional(),

  branchCode: z
    .string({ error: "Please enter branch code" })
    .trim()
    .min(1, { error: "Please enter branch code" }),

  employmentType: engineerEmploymentTypeZodSchema,

  state: z
    .string({ error: "Please enter state" })
    .trim()
    .min(1, { error: "Please enter state" }),

  district: z
    .string({ error: "Please enter district" })
    .trim()
    .min(1, { error: "Please enter district" }),

  baseLocation: z
    .string({ error: "Please enter base location" })
    .trim()
    .min(1, { error: "Please enter base location" }),

  skillSet: z.array(engineerSkillZodSchema, {
    error: "Please enter skill set",
  }),

  assignedDeviceCount: z.coerce
    .number({ error: "Please enter assigned device count" })
    .optional(),

  status: engineerStatusZodSchema.optional(),

  joiningDate: z.coerce.date({ error: "Please enter joining date" }),
  lastWorkingDate: z.coerce
    .date({ error: "Please enter last working date" })
    .optional(),

  idProofType: engineerIdProofTypeZodSchema,
  idProofNumber: z
    .string({ error: "Please enter ID proof number" })
    .trim()
    .min(1, { error: "Please enter ID proof number" }),

  currentLatitude: z.coerce
    .number({ error: "Please enter latitude" })
    .optional(),
  currentLongitude: z.coerce
    .number({ error: "Please enter longitude" })
    .optional(),
  locationUpdatedAt: z.coerce
    .date({ error: "Please enter location updated date" })
    .optional(),

  remarks: z
    .string({ error: "Please enter remarks" })
    .trim()
    .min(1, { error: "Please enter remarks" })
    .optional(),
  LoginStatus: engineerLoginStatusZodSchema.optional(),
});

/* ================= UPDATE ================= */

export const fieldEngineerUpdateZodSchema = fieldEngineerZodSchema.partial();

/* ================= TYPES ================= */

export type FieldEngineerZodType = z.infer<typeof fieldEngineerZodSchema>;
export type FieldEngineerUpdateZodType = z.infer<
  typeof fieldEngineerUpdateZodSchema
>;

/* ================= RESPONSE ================= */

export const fieldEngineerResponseZodSchema = fieldEngineerZodSchema.extend({
  id: uuidZodSchemaGen("id"),
  ...extraFields,
  pincodeMappings: z.array(
    z.object({
      mappingPincode: z.string(),
    })
  ),
});

export const fieldEngineerQueryZodSchema = z.object({
  ...commonQueryParamsZodSchema.shape,
  aggregatorId: z.uuid().nullable().optional(),
  employmentType: z
    .union([
      engineerEmploymentTypeZodSchema,
      z.array(engineerEmploymentTypeZodSchema),
    ])
    .optional(),
});
