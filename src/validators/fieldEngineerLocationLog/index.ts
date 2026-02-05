import {
  extraFields,
  latZodSchema,
  longZodSchema,
  uuidZodSchemaGen,
} from "../common/index.js";
import { z } from "../index.js";

export const FieldEngineerLocationLogZodSchema = z.object({
  fieldEngineerId: uuidZodSchemaGen("field engineer id"),
  lat: latZodSchema,
  long: longZodSchema,
  timestamp: z.coerce.date({ error: "Please enter a valid time stamp" }),
});

export type FieldEngineerLocationLogZodType = z.infer<
  typeof FieldEngineerLocationLogZodSchema
>;

export const FieldEngineerLocationLogResponseZodSchema =
  FieldEngineerLocationLogZodSchema.extend({
    id: uuidZodSchemaGen("id"),
    ...extraFields,
  });
