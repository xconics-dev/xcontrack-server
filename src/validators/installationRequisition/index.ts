import { z } from "../index.js";
import {
  booleanZodSchema,
  commonQueryParamsZodSchema,
  dateZodSchemaGen,
  extraFields,
  uuidZodSchemaGen,
} from "../common/index.js";
import { lenderBranchResponseZodSchema } from "../lenderBranch/index.js";
import { fieldEngineerResponseZodSchema } from "../fieldEngineer/index.js";

/* ================= ENUMS ================= */

export const installationDeviceTypeZodSchema = z.enum(
  ["GPS", "CAMERA", "SENSOR"],
  { error: "Please enter a valid device type" }
);

export const installationPriorityZodSchema = z.enum(
  ["NORMAL", "HIGH", "URGENT"],
  { error: "Please enter a valid priority" }
);

export const installationStatusZodSchema = z.enum(
  [
    "NEW",
    "ASSIGNED",
    "IN_PROGRESS",
    "COMPLETED",
    "CANCELLED",
    "PENDING",
    "ACCEPTED",
  ],
  { error: "Please enter a valid installation status" }
);

export const aadhaarVerificationStatusZodSchema = z.enum(
  ["VERIFIED", "NOT_VERIFIED"],
  { error: "Please enter a valid Aadhaar verification status" }
);

export const checklistStatusZodSchema = z.enum(["PASS", "FAIL"], {
  error: "Please enter a valid checklist status",
});

export const batteryBackupStatusZodSchema = z.enum(["OK", "NOT_OK"], {
  error: "Please enter a valid battery backup status",
});

/* ================= CREATE ================= */

export const installationRequisitionZodSchema = z.object({
  requisitionNo: z
    .string({ error: "Please enter requisition number" })
    .trim()
    .min(1, { error: "Please enter requisition number" }),

  lenderId: uuidZodSchemaGen("lender id"),
  branchId: uuidZodSchemaGen("branch id"),

  vehicleNo: z
    .string({ error: "Please enter vehicle number" })
    .trim()
    .min(1, { error: "Please enter vehicle number" }),

  customerName: z
    .string({ error: "Please enter customer name" })
    .trim()
    .min(1, { error: "Please enter customer name" }),

  customerMobile: z
    .string({ error: "Please enter customer mobile" })
    .trim()
    .min(1, { error: "Please enter customer mobile" }),

  installationAddress: z
    .string({ error: "Please enter installation address" })
    .trim()
    .min(1, { error: "Please enter installation address" }),

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

  deviceType: installationDeviceTypeZodSchema.optional(),
  quantity: z.coerce.number({ error: "Please enter quantity" }).optional(),

  priority: installationPriorityZodSchema.optional(),

  requestedBy: uuidZodSchemaGen("requested by").optional(),

  requestedAt: z.coerce
    .date({ error: "Please enter requested date" })
    .optional(),

  preferredInstallationDate: z.coerce
    .date({ error: "Please enter preferred installation date" })
    .optional(),

  assignedAggregatorId: uuidZodSchemaGen("aggregator id").optional(),

  tatHours: z.coerce.number({ error: "Please enter TAT hours" }),

  installationFinishTimeAssigned: z.coerce
    .date({ error: "Please enter installation finish time" })
    .optional(),

  status: installationStatusZodSchema.optional(),

  completedAt: z.coerce
    .date({ error: "Please enter completion date" })
    .optional(),

  /* ---------- Aadhaar ---------- */

  customerAadhaarNo: z
    .string({ error: "Please enter Aadhaar number" })
    .trim()
    .min(1, { error: "Please enter Aadhaar number" })
    .optional(),

  aadhaarVerificationStatus: aadhaarVerificationStatusZodSchema.optional(),

  aadhaarVerifiedBy: uuidZodSchemaGen("aadhaar verified by").optional(),

  aadhaarVerifiedAt: z.coerce
    .date({ error: "Please enter Aadhaar verified date" })
    .optional(),

  /* ---------- Images ---------- */

  vehicleNumberPlateImage: z
    .string({ error: "Please enter vehicle number plate image" })
    .trim()
    .min(1, { error: "Please enter vehicle number plate image" })
    .optional(),

  vehicleImage: z
    .string({ error: "Please enter vehicle image" })
    .trim()
    .min(1, { error: "Please enter vehicle image" })
    .optional(),

  customerImage: z
    .string({ error: "Please enter customer image" })
    .trim()
    .min(1, { error: "Please enter customer image" })
    .optional(),

  /* ---------- Checklist ---------- */

  gsmChecklist: checklistStatusZodSchema.optional(),
  gsmSignalStrength: z.coerce
    .number({ error: "Please enter GSM signal strength" })
    .optional(),

  gpsChecklist: checklistStatusZodSchema.optional(),
  gpsSatelliteCount: z.coerce
    .number({ error: "Please enter GPS satellite count" })
    .optional(),

  mainPowerChecklist: checklistStatusZodSchema.optional(),
  batteryBackupStatus: batteryBackupStatusZodSchema.optional(),

  checklistVerifiedBy: uuidZodSchemaGen("check list verified by").optional(),

  checklistVerifiedAt: z.coerce
    .date({ error: "Please enter checklist verified date" })
    .optional(),

  /* ---------- Meta ---------- */

  remarks: z
    .string({ error: "Please enter remarks" })
    .trim()
    .min(1, { error: "Please enter remarks" })
    .optional(),
  xconicsValidation: z
    .boolean({
      error: "Please enter a valid xconics validation type",
    })
    .optional(),
});

/* ================= UPDATE ================= */

export const installationRequisitionUpdateZodSchema =
  installationRequisitionZodSchema.partial();

/* ================= TYPES ================= */

export type InstallationRequisitionZodType = z.infer<
  typeof installationRequisitionZodSchema
>;

export type InstallationRequisitionUpdateZodType = z.infer<
  typeof installationRequisitionUpdateZodSchema
>;

/* ================= RESPONSE ================= */

export const installationRequisitionResponseZodSchema =
  installationRequisitionZodSchema.extend({
    id: uuidZodSchemaGen("id"),
    ...extraFields,
    branch: lenderBranchResponseZodSchema.pick({
      branchCode: true,
      branchName: true,
    }),
    installationRequisitionRequests: z.array(
      z.object({
        assignedEngineer: fieldEngineerResponseZodSchema.pick({
          engineerName: true,
          engineerCode: true,
          mobileNo: true,
        }),
      })
    ),
  });
export const installationRequisitionQueryZodSchema =
  commonQueryParamsZodSchema.extend({
    fieldEngineerId: uuidZodSchemaGen("field engineer id").optional(),
    gte: dateZodSchemaGen("gte date").optional(),
    lte: dateZodSchemaGen("lte date").optional(),
    status: z.enum(["CLOSED", "ACCEPTED"]).optional(),
    installationStatus: installationStatusZodSchema.optional(),
    branchId: uuidZodSchemaGen("branch id").optional(),
  });
/* ================= CREATE ================= */

export const installationRequisitionRequestZodSchema = z.object({
  installationRequisitionId: uuidZodSchemaGen("installation requisition id"),

  assignedEngineerId: uuidZodSchemaGen("assigned engineer id"),

  engineerAcceptTicket: z
    .boolean({
      error: "Please enter engineer accept ticket flag",
    })
    .optional(),
});

/* ================= UPDATE ================= */

export const installationRequisitionRequestUpdateZodSchema =
  installationRequisitionRequestZodSchema.partial();

/* ================= TYPES ================= */

export type InstallationRequisitionRequestZodType = z.infer<
  typeof installationRequisitionRequestZodSchema
>;

export type InstallationRequisitionRequestUpdateZodType = z.infer<
  typeof installationRequisitionRequestUpdateZodSchema
>;

/* ================= RESPONSE ================= */

export const installationRequisitionRequestResponseZodSchema =
  installationRequisitionRequestZodSchema.extend({
    id: uuidZodSchemaGen("id"),
    ...extraFields,
    installationRequisition: installationRequisitionResponseZodSchema.pick({
      requisitionNo: true,
      state: true,
      district: true,
      pincode: true,
      installationAddress: true,
      quantity: true,
      completedAt: true,
    }),
  });

export const installationRequisitionRequestQueryZodSchema =
  commonQueryParamsZodSchema.omit({ search: true }).extend({
    fieldEngineerId: uuidZodSchemaGen("field engineer id").optional(),
    ticketStatus: booleanZodSchema("ticket status").optional(),
  });
