import { Request, Response, NextFunction } from "express";
import { isActive, Role } from "../modules/user/user.interface";
import AppError from "../errorHelper/AppError";
import { StatusCodes } from "http-status-codes";
import { envVars } from "../config/env";
import { User } from "../modules/user/user.model";
import { verifyTocken } from "./jwt";

// Extend Express Request interface to include 'user'
import { JwtPayload } from "jsonwebtoken";

export const cheakAuth = (...allawerRoles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessTocken = req.headers.authorization;
      if (!accessTocken) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "you are not authorized");
      }

      if (!envVars.JWT_ACCESS_SECRECT) {
        throw new AppError(500, "Jwt secret is not configure");
      }

      const verifyedTocken = verifyTocken(
        accessTocken,
        envVars.JWT_ACCESS_SECRECT
      ) as JwtPayload;

      const isUserExsit = await User.findOne({ email: verifyedTocken.email });
      if (!isUserExsit) {
        throw new AppError(StatusCodes.BAD_REQUEST, "user dose not exsit");
      }

      if (isUserExsit.isActive === isActive.BLOCKED) {
        throw new AppError(StatusCodes.BAD_REQUEST, "user is blocked");
      }

      if (isUserExsit.isDeleted) {
        throw new AppError(StatusCodes.BAD_REQUEST, "User is deleted");
      }

      const userRole = verifyedTocken?.role;
      if (!allawerRoles.includes(userRole)) {
        throw new AppError(403, "you are not permited this route");
      }
      req.user = verifyedTocken;

      next();
    } catch (error) {
      next(error);
    }
  };
};
