import { Router } from "express";
import { AuthMiddleware } from "../../middleware/auth.js";
import authAccessConfig from "../../config/access.js";
import { asyncErrorHandler } from "../../utils/asyncErrorHandler.js";
import lenderController from "../../controllers/lender/index.js";
const lenderAuthConfig = authAccessConfig.lender;

const lenderRouter = Router();

lenderRouter
  .post(
    "/create",
    AuthMiddleware(lenderAuthConfig.create.auth),
    asyncErrorHandler(lenderController.create)
  )
  .get(
    "/read/:id",
    AuthMiddleware(lenderAuthConfig.read.auth),
    asyncErrorHandler(lenderController.read)
  )
  .put(
    "/update/:id",
    AuthMiddleware(lenderAuthConfig.update.auth),
    asyncErrorHandler(lenderController.update)
  )
  .delete(
    "/delete/:id",
    AuthMiddleware(lenderAuthConfig.delete.auth),
    asyncErrorHandler(lenderController.delete)
  )
  .get(
    "/list",
    AuthMiddleware(lenderAuthConfig.read.auth),
    asyncErrorHandler(lenderController.list)
  );

export default lenderRouter;
