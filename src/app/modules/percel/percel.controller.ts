import catchAsync from "../../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import { parcelServices } from "./parcel.services";
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

export const percelController = {
  createPercel,
};
