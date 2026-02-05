import { z } from "../index.js";
import {
  commonQueryParamsZodSchema,
  extraFields,
  latZodSchema,
  longZodSchema,
  uuidZodSchemaGen,
} from "../common/index.js";

/* ================= ENUMS ================= */

export const branchTypeZodSchema = z.enum(
  ["HO", "REGIONAL", "AREA", "BRANCH"],
  { error: "Please enter a valid branch type" }
);

export const branchStatusZodSchema = z.enum(["ACTIVE", "INACTIVE"], {
  error: "Please enter a valid branch status",
});

/* ================= CREATE ================= */

export const lenderBranchZodSchema = z.object({
  lenderId: uuidZodSchemaGen("lender id"),

  branchCode: z
    .string({ error: "Please enter branch code" })
    .trim()
    .min(1, { error: "Please enter branch code" }),

  branchName: z
    .string({ error: "Please enter branch name" })
    .trim()
    .min(1, { error: "Please enter branch name" }),

  branchType: branchTypeZodSchema,

  contactPersonName: z
    .string({ error: "Please enter contact person name" })
    .trim()
    .min(1, { error: "Please enter contact person name" }),

  contactMobile: z
    .string({ error: "Please enter contact mobile" })
    .trim()
    .min(1, { error: "Please enter contact mobile" }),

  contactEmail: z.email({ error: "Please enter valid contact email" }).trim(),

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

  latitude: latZodSchema.optional(),
  longitude: longZodSchema.optional(),

  locationUpdatedAt: z.coerce
    .date({ error: "Please enter location updated date" })
    .optional(),

  billingApplicable: z.boolean({
    error: "Please enter billing applicable flag",
  }),

  status: branchStatusZodSchema.optional(),

  remarks: z
    .string({ error: "Please enter remarks" })
    .trim()
    .min(1, { error: "Please enter remarks" })
    .optional(),
});

/* ================= UPDATE ================= */

export const lenderBranchUpdateZodSchema = lenderBranchZodSchema.partial();

/* ================= TYPES ================= */

export type LenderBranchZodType = z.infer<typeof lenderBranchZodSchema>;
export type LenderBranchUpdateZodType = z.infer<
  typeof lenderBranchUpdateZodSchema
>;

/* ================= RESPONSE ================= */

export const lenderBranchResponseZodSchema = lenderBranchZodSchema.extend({
  id: uuidZodSchemaGen("id"),
  ...extraFields,
});

export const lenderBranchQueryZodSchema = z.object({
  ...commonQueryParamsZodSchema.shape,
  lenderId: z.uuid().optional(),
});
