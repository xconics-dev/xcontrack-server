import { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import Config, { statusCodes } from "../config/index.js";

const { JsonWebTokenError, NotBeforeError, TokenExpiredError, verify } = jwt;

export const AuthMiddleware = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bearerArr = req.headers.authorization?.split(" ");
      if (bearerArr?.length !== 2 || bearerArr[0] !== "Bearer")
        return res
          .status(statusCodes.unauthorized)
          .json({ error: "Invalid token. Please log in again." });

      const token = bearerArr[1];
      if (!token) {
        res.status(statusCodes.unauthorized).json({ error: "not logged in!" });
        return;
      }
      const verifiedToken = verify(token, Config.JWT_SECRET) as JwtPayload;
      if (!verifiedToken) {
        res.status(statusCodes.unauthorized).json({ error: "not logged in!" });
        return;
      }

      if (!roles.includes(verifiedToken.type)) {
        res
          .status(statusCodes.unauthorized)
          .json({ error: "Permission to perform this action is absent!" });
        return;
      }

      res.locals.userInfo = verifiedToken;

      return next();
    } catch (err) {
      // Handle JWT-specific errors gracefully
      if (err instanceof TokenExpiredError) {
        return res
          .status(statusCodes.unauthorized)
          .json({ error: "Token expired. Please log in again." });
      }

      if (err instanceof JsonWebTokenError) {
        return res
          .status(statusCodes.unauthorized)
          .json({ error: "Invalid token. Please log in again." });
      }

      if (err instanceof NotBeforeError) {
        return res
          .status(statusCodes.unauthorized)
          .json({ error: "Token not active yet." });
      }

      console.log(err);
    }
  };
};
