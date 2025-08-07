import { parcelServices } from "./parcel.services";
import catchAsync from "../../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

import AppError from "../../errorHelper/AppError";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";

const createPercel = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const decodedTocken = req.user;
    console.log(decodedTocken);
    if (!decodedTocken) {
      throw new AppError(StatusCodes.BAD_REQUEST, "you are not authorized");
    }

    const parcelInfo = await parcelServices.createParcel(
      payload,
      decodedTocken
    );

    sendResponse(res, {
      success: true,
      message: "percel created successfuly",
      statusCode: StatusCodes.CREATED,
      data: parcelInfo,
    });
  }
);

const getPercelForSender = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;
    const result = await parcelServices.getAllPercel(userId);
    sendResponse(res, {
      success: true,
      message: "all percel heare",
      statusCode: StatusCodes.OK,
      data: result,
    });
  }
);

const updateStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const percelId = req.params.id;
    const updateStatus = req.body;

    if (!req.user) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "you are not authorized");
    }
    const decodedToken = req.user as JwtPayload;

    const updatedInfo = await parcelServices.updateStatus(
      percelId,
      updateStatus,
      decodedToken
    );

    sendResponse(res, {
      success: true,
      message: "updated status success",
      statusCode: StatusCodes.OK,
      data: updatedInfo,
    });
  }
);

export const percelController = {
  createPercel,
  getPercelForSender,
  updateStatus,
};
