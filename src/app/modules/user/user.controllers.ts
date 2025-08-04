import catchAsync from "../../utils/catchAsync";
import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import { userServices } from "./user.services";
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const result = await userServices.createUser(req.body);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  }
);

export const userController = {
  createUser,
};
