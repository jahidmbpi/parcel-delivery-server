import catchAsync from "../../utils/catchAsync";
import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import { userServices } from "./user.services";
import AppError from "../../errorHelper/AppError";
import { sendResponse } from "../../utils/sendResponse";
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

const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const payload = req.body;
    const decodedTocken = req.user;
    console.log("update", userId, payload, decodedTocken);
    if (!decodedTocken) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid token");
    }

    const updatedUser = await userServices.updateUser(
      userId,
      payload,
      decodedTocken
    );

    sendResponse(res, {
      success: true,
      message: "user updated successfully",
      statusCode: StatusCodes.OK,
      data: updatedUser,
    });
  }
);

export const userController = {
  createUser,
  updateUser,
};
