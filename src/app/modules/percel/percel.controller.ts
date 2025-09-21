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

//incomi percel fior riviver
const incomingParcel = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.userId;
    const parcelInfo = await parcelServices.incomingPercel(id);

    sendResponse(res, {
      success: true,
      message: "all incoming percel for riciver percel heare",
      statusCode: StatusCodes.OK,
      data: parcelInfo,
    });
  }
);

//get percel for sender

const senderParcel = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const senderId = req.user?.userId;
    const parcelinfo = await parcelServices.senderAllPercel(senderId);
    console.log(parcelinfo);
    sendResponse(res, {
      success: true,
      message: "all incoming percel for sender percel heare",
      statusCode: StatusCodes.OK,
      data: parcelinfo,
    });
  }
);

const getPercelForAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;
    console.log(userId, "hiting this api");
    const result = await parcelServices.getAllAdminPercel(userId);
    sendResponse(res, {
      success: true,
      message: "all admin percel heare",
      statusCode: StatusCodes.OK,
      data: result,
    });
  }
);

const updateStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const percelId = req.params.id;
    const payload = req.body;
    console.log("update", payload, percelId);

    if (!req.user) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "you are not authorized");
    }
    const decodedToken = req.user as JwtPayload;

    const updatedInfo = await parcelServices.updateStatus(
      percelId,
      payload,
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
  getPercelForAdmin,
  updateStatus,
  incomingParcel,
  senderParcel,
};
