import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelper/AppError";
import { IPercel } from "./parcel.interface";
import { Parcel } from "./percel.model";
import { JwtPayload } from "jsonwebtoken";
import { Role } from "../user/user.interface";
import { User } from "../user/user.model";
import { id } from "zod/v4/locales/index.cjs";

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
const getAllSenderPercel = async (id: string) => {
  const isSenderExsit = await User.findById(id);
  if (!isSenderExsit) {
    throw new AppError(StatusCodes.NOT_FOUND, "sender not found");
  }
  if (isSenderExsit.role !== Role.SENDER) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "you are not permited this route"
    );
  }

  const percel = await Parcel.find({ sender: id });
  return percel;
};

export const parcelServices = {
  createParcel,
  getAllSenderPercel,
};
