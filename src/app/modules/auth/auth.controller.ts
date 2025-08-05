import catchAsync from "../../utils/catchAsync";
import { authServicecs } from "./auth.services";
import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";

const credentialLogIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = authServicecs.credentialLogIn(req.body);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User created successfully",
      data: loginInfo,
    });
  }
);

const authController = {
  credentialLogIn,
};
