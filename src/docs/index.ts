import {
  OpenAPIRegistry,
  OpenApiGeneratorV31,
} from "@asteasolutions/zod-to-openapi";
import Config from "../config/index.js";
import { aggregatorRegistry } from "./aggregator.js";
import { fieldEngineerRegistry } from "./fieldEngineer.js";
import { lenderRegistry } from "./lender.js";
import { lenderBranchRegistry } from "./lenderBranch.js";
import { warehouseRegistry } from "./warehouse.js";
import { userRegistry } from "./user.js";
import { fieldEngineerPincodeMappingRegistry } from "./fieldEngineerPincodeMapping.js";
import { warehousePincodeMappingRegistry } from "./warehousePincodeMapping copy.js";
import { deviceRegistry } from "./device.js";
import { fieldEngineerLocationLogRegistry } from "./fieldEngineerLocationLog.js";
import { deviceMovementRegistry } from "./deviceMovement.js";
import { installationRequisitionRegistry } from "./installationRequisition.js";
import { deviceTrackingRegistry } from "./deviceTracking.js";
import { supportTicketRegistry } from "./supportTicket.js";
import { vehiclesRegistry } from "./vehicles.js";

export const rootRegistry = new OpenAPIRegistry([
  aggregatorRegistry,
  fieldEngineerRegistry,
  lenderRegistry,
  lenderBranchRegistry,
  warehouseRegistry,
  userRegistry,
  fieldEngineerPincodeMappingRegistry,
  warehousePincodeMappingRegistry,
  deviceRegistry,
  fieldEngineerLocationLogRegistry,
  deviceMovementRegistry,
  installationRequisitionRegistry,
  deviceTrackingRegistry,
  supportTicketRegistry,
  vehiclesRegistry
]);

// Register JWT security scheme globally
rootRegistry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

export function buildOpenApiDocument() {
  const generator = new OpenApiGeneratorV31(rootRegistry.definitions);
  return generator.generateDocument({
    openapi: "3.1.0",
    info: { title: "Sriram Demo API", version: "1.0.0" },
    servers: [
      { url: `http://localhost:${Config.PORT}` },
      { url: `http://172.105.36.66:8020` },
    ],
  });
}
