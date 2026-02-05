import { Router } from "express";
import { asyncErrorHandler } from "../../utils/asyncErrorHandler.js";
import userController from "../../controllers/user/index.js";
import { AuthMiddleware } from "../../middleware/auth.js";
import authAccessConfig from "../../config/access.js";

const userRouter = Router();

userRouter
  .post("/signup", asyncErrorHandler(userController.signup))
  .post("/signin", asyncErrorHandler(userController.signin))
  .get(
    "/status",
    AuthMiddleware(authAccessConfig.all.auth),
    asyncErrorHandler(userController.status)
  );

export default userRouter;
