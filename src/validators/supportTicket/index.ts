import { z } from "../index.js";
import {
  booleanZodSchema,
  commonQueryParamsZodSchema,
  dateZodSchemaGen,
  extraFields,
  uuidZodSchemaGen,
} from "../common/index.js";
import { installationRequisitionResponseZodSchema } from "../installationRequisition/index.js";
import { fieldEngineerResponseZodSchema } from "../fieldEngineer/index.js";

const installationRequisitionToIncludeSchema =
  installationRequisitionResponseZodSchema.pick({
    vehicleNo: true,
    customerName: true,
    customerMobile: true,
    customerAadhaarNo: true,
  });

/* ================= ENUMS ================= */

export const supportStatusZodSchema = z.enum(
  [
    "NEW",
    "ASSIGNED",
    "IN_PROGRESS",
    "COMPLETED",
    "CANCELLED",
    "PENDING",
    "ACCEPTED",
  ],
  { error: "Please enter a valid support status" }
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

export const supportTicketZodSchema = z.object({
  installationRequisitionId: uuidZodSchemaGen("installtion requisition id"),

  ticketNo: z
    .string({ error: "Please enter issue detail" })
    .trim()
    .min(1, { error: "Please enter issue detail" }),
  issueDetail: z
    .string({ error: "Please enter issue detail" })
    .trim()
    .min(1, { error: "Please enter issue detail" }),
  supportAddress: z
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

  requestedBy: uuidZodSchemaGen("requested by user id").optional(),

  requestedAt: z.coerce
    .date({ error: "Please enter requested date" })
    .optional(),

  preferredSupportDate: z.coerce
    .date({ error: "Please enter preferred support date" })
    .optional(),

  assignedAggregatorId: uuidZodSchemaGen("assigned aggregator id").optional(),

  tatHours: z.coerce.number({ error: "Please enter TAT hours" }),

  supportFinishTimeAssigned: z.coerce
    .date({ error: "Please enter support finish time" })
    .optional(),

  status: supportStatusZodSchema.optional(),

  completedAt: z.coerce
    .date({ error: "Please enter completion date" })
    .optional(),

  /* ---------- Aadhaar ---------- */

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

  checklistVerifiedBy: uuidZodSchemaGen("checklist verified by").optional(),

  checklistVerifiedAt: z.coerce
    .date({ error: "Please enter checklist verified date" })
    .optional(),

  xconicsValidation: z
    .boolean({
      error: "Please enter Xconics validation flag",
    })
    .optional(),

  /* ---------- Meta ---------- */

  remarks: z
    .string({ error: "Please enter remarks" })
    .trim()
    .min(1, { error: "Please enter remarks" })
    .optional(),
});

/* ================= UPDATE ================= */

export const supportTicketUpdateZodSchema = supportTicketZodSchema.partial();

/* ================= TYPES ================= */

export type SupportTicketZodType = z.infer<typeof supportTicketZodSchema>;

export type SupportTicketUpdateZodType = z.infer<
  typeof supportTicketUpdateZodSchema
>;

/* ================= RESPONSE ================= */

export const supportTicketResponseZodSchema = supportTicketZodSchema.extend({
  id: uuidZodSchemaGen("id"),
  ...extraFields,
  supportTicketRequests: z.array(
    z.object({
      assignedEngineer: fieldEngineerResponseZodSchema.pick({
        engineerName: true,
        engineerCode: true,
        mobileNo: true,
      }),
    })
  ),
  installationRequisition: installationRequisitionToIncludeSchema,
});

export const supportTicketQueryZodSchema = commonQueryParamsZodSchema.extend({
  fieldEngineerId: uuidZodSchemaGen("field engineer id").optional(),
  gte: dateZodSchemaGen("gte date").optional(),
  lte: dateZodSchemaGen("lte date").optional(),
  supportStatus: supportStatusZodSchema.optional(),
  branchId: uuidZodSchemaGen("branch id").optional(),
});

/* ================= CREATE ================= */

export const supportTicketRequestZodSchema = z.object({
  supportTicketId: uuidZodSchemaGen("support ticket id"),

  assignedEngineerId: uuidZodSchemaGen("assigned engineer id"),

  engineerAcceptTicket: z
    .boolean({
      error: "Please enter engineer accept ticket flag",
    })
    .optional(),
});

/* ================= UPDATE ================= */

export const supportTicketRequestUpdateZodSchema =
  supportTicketRequestZodSchema.partial();

/* ================= TYPES ================= */

export type SupportTicketRequestZodType = z.infer<
  typeof supportTicketRequestZodSchema
>;

export type SupportTicketRequestUpdateZodType = z.infer<
  typeof supportTicketRequestUpdateZodSchema
>;

/* ================= RESPONSE ================= */

export const supportTicketRequestResponseZodSchema =
  supportTicketRequestZodSchema.extend({
    id: uuidZodSchemaGen("id"),
    ...extraFields,
    supportTicket: supportTicketResponseZodSchema
      .pick({
        ticketNo: true,
        state: true,
        district: true,
        pincode: true,
        supportAddress: true,
        completedAt: true,
      })
      .extend({
        installationRequisition: installationRequisitionToIncludeSchema,
      }),
  });

export const supportTicketRequestQueryZodSchema = commonQueryParamsZodSchema
  .omit({ search: true })
  .extend({
    fieldEngineerId: uuidZodSchemaGen("field engineer id").optional(),
    ticketStatus: booleanZodSchema("ticket status").optional(),
  });
