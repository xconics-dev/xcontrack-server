import "dotenv/config";

import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import Config, { statusCodes } from "./config/index.js";
import morgan from "morgan";
import aggregatorRouter from "./routes/aggregator/index.js";
import lenderRouter from "./routes/lender/index.js";
import lenderBranchRouter from "./routes/lenderBranch/index.js";
import warehouseRouter from "./routes/warehouse/index.js";
import fieldEngineerRouter from "./routes/fieldEngineer/index.js";
import userRouter from "./routes/user/index.js";
import warehousePincodeMappingRouter from "./routes/warehousePincodeMapping/index.js";
import fieldEngineerPincodeMappingRouter from "./routes/fieldEngineerPincodeMapping/index.js";
import { buildOpenApiDocument } from "./docs/index.js";
import swaggerUi from "swagger-ui-express";
import deviceRouter from "./routes/device/index.js";
import "./lib/cron/index.js";
import fieldEngineerLocationLogRouter from "./routes/fieldEngineerLocationLog/index.js";
import deviceMovementRouter from "./routes/deviceMovement/index.js";
import installationRequisitionRouter from "./routes/installationRequisition/index.js";
import deviceTrackingRouter from "./routes/deviceTracking/index.js";
import supportTicketRouter from "./routes/supportTicket/index.js";
import vehicleRouter from "./routes/vehicles/index.js";
import { scheduleJerkIgnitionSync } from "./cron/vehicle-ignition.js";

const app = express();

app.use(cors());

app.use(express.json({ limit: "10mb" }));

// Use Morgan middleware
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is currently up and running.",
  });
});

app.use("/aggregator", aggregatorRouter);
app.use("/lender", lenderRouter);
app.use("/lenderBranch", lenderBranchRouter);
app.use("/warehouse", warehouseRouter);
app.use("/warehousePincodeMapping", warehousePincodeMappingRouter);
app.use("/fieldEngineer", fieldEngineerRouter);
app.use("/fieldEngineerPincodeMapping", fieldEngineerPincodeMappingRouter);
app.use("/user", userRouter);
app.use("/device", deviceRouter);
app.use("/deviceMovement", deviceMovementRouter);
app.use("/fieldEngineerLocationLog", fieldEngineerLocationLogRouter);
app.use("/installationRequisition", installationRequisitionRouter);
app.use("/deviceTracking", deviceTrackingRouter);
app.use("/supportTicket", supportTicketRouter);

//new
app.use("/vehicles", vehicleRouter);

const document = buildOpenApiDocument();
app.get("/openapi.json", (_req, res) => res.json(document));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(document));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) console.log(err.message);
  res.status(statusCodes.serverError).json({ error: "Something went wrong" });
});

// ── Start server + cron jobs ──────────────────────────────────────────────────
app.listen(Config.PORT, () => {
  console.log(`Listening on port ${Config.PORT}`);

  // node-cron tasks auto-start — no need to call .start()
  scheduleJerkIgnitionSync();
});
