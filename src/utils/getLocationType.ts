import z from "zod";
import { deviceMovementTypeZodSchema } from "../validators/deviceMovement/index.js";
import { locationType } from "../validators/device/index.js";

export const getLocationType = (
  input: z.infer<typeof deviceMovementTypeZodSchema>
): z.infer<typeof locationType> => {
  let result: z.infer<typeof locationType> = "PRODUCTION_FLOOR";
  switch (input) {
    case "PROD_TO_WH":
      result = "WAREHOUSE";
      break;
    case "WH_TO_ENGINEER":
      result = "FIELD_ENGINEER";
      break;
    case "ENGINEER_TO_VEHICLE":
      result = "VEHICLE";
  }
  return result;
};
