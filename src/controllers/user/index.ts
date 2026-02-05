import { Request, Response } from "express";
import {
  userSigninZodSchema,
  userZodSchema,
} from "../../validators/user/index.js";
import Config, { statusCodes } from "../../config/index.js";
import userDb from "../../models/user/index.js";
import jwt from "jsonwebtoken";

const { sign } = jwt;

const userController = {
  signup: async (req: Request, res: Response) => {
    // input validation
    const parsedUser = userZodSchema.parse(req.body);

    const user = await userDb.signup(parsedUser);

    return res.json({
      message: "User signed up successfully",
      data: user.id,
    });
  },
  signin: async (req: Request, res: Response) => {
    // input validation
    const parsedUser = userSigninZodSchema.parse(req.body);

    const user = await userDb.signin(parsedUser);

    if (!user)
      return res
        .status(statusCodes.clientError)
        .json({ error: "Wrong credentials" });

    const token = sign(
      {
        id: user.id,
        type: user.type,
        aggregatorId: user.aggregatorId,
        lenderId: user.lenderId,
        fieldEngineerId: user.fieldEngineerId,
      },
      Config.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.json({
      message: "User signed in successfully",
      data: `Bearer ${token}`,
    });
  },
  status: async (req: Request, res: Response) => {
    const userId = res.locals.userInfo.id;

    const user = await userDb.status(userId);

    return res.json({
      message: "User status fetched successfully",
      data: user,
    });
  },
};

export default userController;
