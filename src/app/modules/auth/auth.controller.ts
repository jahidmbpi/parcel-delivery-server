import catchAsync from "../../utils/catchAsync";

import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { sendResponse } from "../../utils/sendResponse";
import { setAuthCookie } from "../../utils/setCoockie";
import { authServices } from "./auth.services";
import AppError from "../../errorHelper/AppError";

const credentialLogIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);

    const loginInfo = await authServices.credentialLogIn(req.body);

    console.log("accessToken", loginInfo.acccessTocken);
    console.log("refreshToken", loginInfo.refreshTocken);

    setAuthCookie(res, {
      accessToken: loginInfo.acccessTocken,
      refreshToken: loginInfo.refreshTocken,
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User login successfully",
      data: {
        accessToken: loginInfo.acccessTocken,
        refreshToken: loginInfo.refreshTocken,
      },
    });
  }
);

const logOut = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "user log out successfully",
      data: null,
    });
  }
);

const resetPssword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    if (!req.user) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "unauthorized request");
    }
    const decodedTocken = req.user as JwtPayload;

    const finalpass = await authServices.resetPassword(
      oldPassword,
      newPassword,
      decodedTocken
    );
    console.log("resetPss", finalpass);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Password updated successfully",
      data: null,
    });
  }
);

export const authController = {
  credentialLogIn,
  logOut,
  resetPssword,
};
