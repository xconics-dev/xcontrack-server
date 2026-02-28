import Config from "../../config/index.js";
import { z } from "../index.js";

export const uuidZodSchemaGen = (name: string) =>
  z
    .string({ message: `${name} required` })
    .uuid({ message: `${name} is not a valid uuid` });

export const dateZodSchemaGen = (name: string) =>
  z.coerce.date({ message: `${name} is not a valid date` });

export const booleanZodSchema = (name: string) =>
  z.preprocess((val) => {
    return val === "true" ? true : val === "false" ? false : undefined;
  }, z.boolean({ message: `Invalid ${name}` }).optional());

export const minMaxZodSchema = z
  .array(z.coerce.number({ message: "Min and max of range must be a number" }))
  .length(2, {
    message: "Min max must have only two elements, first min then max!",
  })
  .optional();

export type minMaxZodType = z.infer<typeof minMaxZodSchema>;

export const trueBooleanZodSchema = (name: string) =>
  z.boolean({ message: `${name} must be boolean` });

export const commonFieldsZodSchema = {
  createdBy: z.uuid().optional(),
  createdAt: z.date(),
  modifiedAt: z.date().optional(),
  modifiedBy: z.uuid().optional(),
  isDeleted: z.boolean(),
};

export const latZodSchema = z.coerce
  .number({ message: "Invalid latitude" })
  .min(-90, { message: "Invalid latitude" })
  .max(90, { message: "Invalid latitude" });
export const longZodSchema = z.coerce
  .number({ message: "Invalid longitude" })
  .min(-180, { message: "Invalid longitude" })
  .max(180, { message: "Invalid longitude" });

export const extraFields = {
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
};

export const commonQueryParamsZodSchema = z.object({
  imei: z.string().optional(),
  search: z
    .string({ error: "Please enter valid search string" })
    .optional()
    .default(""),
  offset: z.coerce
    .number({ error: "Please enter a valid offset value" })
    .optional()
    .default(0),
  limit: z.coerce
    .number({ error: "Please enter a valid limit value" })
    .optional()
    .default(Config.PAGE_ITEM_COUNT),
});
