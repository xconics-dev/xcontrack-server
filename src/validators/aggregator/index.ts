import { z } from "../index.js";
import { extraFields, uuidZodSchemaGen } from "../common/index.js";

/* ================= ENUMS ================= */

export const aggregatorServiceTypeZodSchema = z.enum(
  ["INSTALLATION", "REPAIR", "BOTH"],
  { error: "Please enter a valid service type" }
);

export const aggregatorBillingCycleZodSchema = z.enum(
  ["WEEKLY", "FORTNIGHTLY"],
  { error: "Please enter a valid billing cycle" }
);

export const aggregatorStatusZodSchema = z.enum(["ACTIVE", "INACTIVE"], {
  error: "Please enter a valid aggregator status",
});

/* ================= CREATE ================= */

export const aggregatorZodSchema = z.object({
  aggregatorCode: z
    .string({ error: "Please enter aggregator code" })
    .trim()
    .min(1, { error: "Please enter aggregator code" }),

  aggregatorName: z
    .string({ error: "Please enter aggregator name" })
    .trim()
    .min(1, { error: "Please enter aggregator name" }),

  contactPersonName: z
    .string({ error: "Please enter contact person name" })
    .trim()
    .min(1, { error: "Please enter contact person name" }),

  contactMobile: z
    .string({ error: "Please enter contact mobile" })
    .trim()
    .min(1, { error: "Please enter contact mobile" }),

  contactEmail: z.email({ error: "Please enter valid contact email" }).trim(),

  officeAddress: z
    .string({ error: "Please enter office address" })
    .trim()
    .min(1, { error: "Please enter office address" }),

  state: z
    .string({ error: "Please enter state" })
    .trim()
    .min(1, { error: "Please enter state" }),

  district: z
    .string({ error: "Please enter district" })
    .trim()
    .min(1, { error: "Please enter district" }),

  serviceCoverage: z
    .string({ error: "Please enter service coverage" })
    .trim()
    .min(1, { error: "Please enter service coverage" }),

  serviceType: aggregatorServiceTypeZodSchema,
  tatHours: z.coerce.number({ error: "Please enter TAT hours" }),

  ldApplicable: z.boolean({ error: "Please enter LD applicable flag" }),
  ldPercentageCap: z.coerce
    .number({ error: "Please enter LD percentage cap" })
    .optional(),

  billingCycle: aggregatorBillingCycleZodSchema,
  paymentTermsDays: z.coerce.number({
    error: "Please enter payment terms days",
  }),

  contractStartDate: z.coerce.date({
    error: "Please enter contract start date",
  }),
  contractEndDate: z.coerce
    .date({ error: "Please enter contract end date" })
    .optional(),

  bankName: z
    .string({ error: "Please enter bank name" })
    .trim()
    .min(1, { error: "Please enter bank name" }),

  bankAccountNo: z
    .string({ error: "Please enter bank account number" })
    .trim()
    .min(1, { error: "Please enter bank account number" }),

  ifscCode: z
    .string({ error: "Please enter IFSC code" })
    .trim()
    .min(1, { error: "Please enter IFSC code" }),

  gstNumber: z
    .string({ error: "Please enter GST number" })
    .trim()
    .min(1, { error: "Please enter GST number" })
    .optional(),

  panNumber: z
    .string({ error: "Please enter PAN number" })
    .trim()
    .min(1, { error: "Please enter PAN number" })
    .optional(),

  status: aggregatorStatusZodSchema.optional(),
  remarks: z
    .string({ error: "Please enter remarks" })
    .trim()
    .min(1, { error: "Please enter remarks" })
    .optional(),
});

/* ================= UPDATE ================= */

export const aggregatorUpdateZodSchema = aggregatorZodSchema.partial();

/* ================= TYPES ================= */

export type AggregatorZodType = z.infer<typeof aggregatorZodSchema>;
export type AggregatorUpdateZodType = z.infer<typeof aggregatorUpdateZodSchema>;

/* ================= RESPONSE ================= */

export const aggregatorResponseZodSchema = aggregatorZodSchema.extend({
  id: uuidZodSchemaGen("id"),
  ...extraFields,
});
