import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelper/AppError";
import { IPercel } from "./parcel.interface";
import { Parcel } from "./percel.model";
import { JwtPayload } from "jsonwebtoken";
import { Role } from "../user/user.interface";

const createParcel = async (payload: IPercel, decodedTocken: JwtPayload) => {
  const isExsitParcel = await Parcel.findOne({ trakinId: payload.trakinId });

  if (isExsitParcel) {
    throw new AppError(StatusCodes.BAD_REQUEST, "this percel alreday exist");
  }
  if (decodedTocken.role !== Role.SENDER) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "You are not permitted to create a parcel"
    );
  }

  const parcel = await Parcel.create(payload);
  return parcel;
};

export const parcelServices = {
  createParcel,
};
