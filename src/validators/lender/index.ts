import { z } from "../index.js";
import { extraFields, uuidZodSchemaGen } from "../common/index.js";

/* ================= ENUMS ================= */

export const lenderTypeZodSchema = z.enum(["NBFC", "BANK", "LEASING"], {
  error: "Please enter a valid lender type",
});

export const billingCycleZodSchema = z.enum(
  ["WEEKLY", "FORTNIGHTLY", "MONTHLY"],
  { error: "Please enter a valid billing cycle" }
);

export const lenderStatusZodSchema = z.enum(["ACTIVE", "INACTIVE"], {
  error: "Please enter a valid lender status",
});

/* ================= CREATE ================= */

export const lenderZodSchema = z.object({
  lenderCode: z
    .string({ error: "Please enter lender code" })
    .trim()
    .min(1, { error: "Please enter lender code" }),

  lenderName: z
    .string({ error: "Please enter lender name" })
    .trim()
    .min(1, { error: "Please enter lender name" }),

  lenderType: lenderTypeZodSchema,

  contactPersonName: z
    .string({ error: "Please enter contact person name" })
    .trim()
    .min(1, { error: "Please enter contact person name" }),

  contactMobile: z
    .string({ error: "Please enter contact mobile" })
    .trim()
    .min(1, { error: "Please enter contact mobile" }),

  contactEmail: z.email({ error: "Please enter valid contact email" }).trim(),

  registeredAddress: z
    .string({ error: "Please enter registered address" })
    .trim()
    .min(1, { error: "Please enter registered address" }),

  state: z
    .string({ error: "Please enter state" })
    .trim()
    .min(1, { error: "Please enter state" }),

  region: z
    .string({ error: "Please enter region" })
    .trim()
    .min(1, { error: "Please enter region" }),

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

  billingCycle: billingCycleZodSchema,

  paymentTermsDays: z.coerce.number({
    error: "Please enter payment terms days",
  }),

  ldApplicable: z.boolean({ error: "Please enter LD applicable flag" }),

  ldPercentageCap: z.coerce
    .number({ error: "Please enter LD percentage cap" })
    .optional(),

  pilotStartDate: z.coerce
    .date({ error: "Please enter pilot start date" })
    .optional(),

  pilotEndDate: z.coerce
    .date({ error: "Please enter pilot end date" })
    .optional(),

  agreementStartDate: z.coerce.date({
    error: "Please enter agreement start date",
  }),

  agreementEndDate: z.coerce
    .date({ error: "Please enter agreement end date" })
    .optional(),

  status: lenderStatusZodSchema.optional(),

  remarks: z
    .string({ error: "Please enter remarks" })
    .trim()
    .min(1, { error: "Please enter remarks" })
    .optional(),
});

/* ================= UPDATE ================= */

export const lenderUpdateZodSchema = lenderZodSchema.partial();

/* ================= TYPES ================= */

export type LenderZodType = z.infer<typeof lenderZodSchema>;
export type LenderUpdateZodType = z.infer<typeof lenderUpdateZodSchema>;

/* ================= RESPONSE ================= */

export const lenderResponseZodSchema = lenderZodSchema.extend({
  id: uuidZodSchemaGen("id"),
  ...extraFields,
});
