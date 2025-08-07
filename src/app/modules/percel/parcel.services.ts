import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelper/AppError";
import { IPercel, Status } from "./parcel.interface";
import { Parcel } from "./percel.model";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";
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
const getAllPercel = async (id: string) => {
  const isSenderExsit = await User.findById(id);
  if (!isSenderExsit) {
    throw new AppError(StatusCodes.NOT_FOUND, "sender not found");
  }

  const user = await User.findById(id);
  console.log(user);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }

  let parcels;

  if (user.role === Role.ADMIN) {
    parcels = await Parcel.find({});
  } else if (user.role === Role.SENDER) {
    parcels = await Parcel.find({ sender: id });
  } else if (user.role === Role.RECEIVER) {
    parcels = await Parcel.find({ reciver: id });
  } else {
    throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized");
  }

  return parcels;
};

const updateStatus = async (
  id: string,
  updateStatus: string,
  decodedToken: JwtPayload
) => {
  const parcel = await Parcel.findById(id);

  if (!parcel) {
    throw new AppError(StatusCodes.NOT_FOUND, "Parcel not found");
  }

  if (parcel.status === updateStatus) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Parcel already has this status"
    );
  }

  parcel.status = updateStatus as Status;
  parcel.trackingEvents.push({
    location: `Updated by ${decodedToken.role}`,
    updatedBy: decodedToken.userId,
    status: updateStatus,
    timestamp: new Date(),
  });

  await parcel.save();

  return {
    message: "percel update successfully",
  };
};

export const parcelServices = {
  createParcel,
  getAllPercel,
  updateStatus,
};
