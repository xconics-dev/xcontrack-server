import { Router } from "express";
import { AuthMiddleware } from "../../middleware/auth.js";
import authAccessConfig from "../../config/access.js";
import { asyncErrorHandler } from "../../utils/asyncErrorHandler.js";
import lenderBranchController from "../../controllers/lenderBranch/index.js";
const lenderBranchAuthConfig = authAccessConfig.lenderBranch;

const lenderBranchRouter = Router();

lenderBranchRouter
  .post(
    "/create",
    AuthMiddleware(lenderBranchAuthConfig.create.auth),
    asyncErrorHandler(lenderBranchController.create)
  )
  .get(
    "/read/:id",
    AuthMiddleware(lenderBranchAuthConfig.read.auth),
    asyncErrorHandler(lenderBranchController.read)
  )
  .put(
    "/update/:id",
    AuthMiddleware(lenderBranchAuthConfig.update.auth),
    asyncErrorHandler(lenderBranchController.update)
  )
  .delete(
    "/delete/:id",
    AuthMiddleware(lenderBranchAuthConfig.delete.auth),
    asyncErrorHandler(lenderBranchController.delete)
  )
  .get(
    "/list",
    AuthMiddleware(lenderBranchAuthConfig.read.auth),
    asyncErrorHandler(lenderBranchController.list)
  );

export default lenderBranchRouter;
