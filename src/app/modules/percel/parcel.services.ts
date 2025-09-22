import { Role } from "./../user/user.interface";
import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelper/AppError";
import { IPercel, Status } from "./parcel.interface";
import { Parcel } from "./percel.model";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";

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

//get all admin parcel
const getAllAdminPercel = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }

  if (user.role !== Role.ADMIN) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "you are not permited this route"
    );
  }

  const adminParcel = await Parcel.find({});
  if (adminParcel.length < 0) {
    throw new AppError(StatusCodes.BAD_REQUEST, "no parcel");
  }
  return adminParcel;
};
//incoming percel for riciver
const incomingPercel = async (id: string) => {
  const isreciver = await User.findById(id);

  if (!isreciver) {
    throw new AppError(StatusCodes.NOT_FOUND, "you are not authorized");
  }

  if (isreciver.role !== Role.RECEIVER) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "you are not permited this route"
    );
  }

  const parcels = await Parcel.find({ reciver: id });

  if (!parcels || parcels.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, "you have no parcel");
  }

  return parcels;
};

//all parcel for sender
const senderAllPercel = async (id: string) => {
  const isSender = await User.findById(id);
  if (!isSender) {
    throw new AppError(StatusCodes.NOT_FOUND, "you are not authorized");
  }
  if (isSender.role !== Role.SENDER) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "you are not permited this route"
    );
  }

  const Senderparcels = await Parcel.find({ sender: id });

  if (!Senderparcels || Senderparcels.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, "you have no parcel");
  }
  return Senderparcels;
};

const updateStatus = async (
  id: string,
  payload: { status: Status },
  decodedToken: JwtPayload
) => {
  const newStatus = payload.status;
  const parcel = await Parcel.findById(id);

  if (!parcel) {
    throw new AppError(StatusCodes.NOT_FOUND, "Parcel not found");
  }

  if (parcel.status === newStatus) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Parcel already has this status"
    );
  }

  if (newStatus === Status.APPROVED) {
    if (decodedToken.role !== Role.ADMIN) {
      throw new AppError(StatusCodes.NOT_FOUND, "only admin can approve");
    }
  }

  if (parcel.status === Status.DISPATCHED) {
    throw new AppError(StatusCodes.BAD_REQUEST, "percel already dispatch");
  }
  if (parcel.status === Status.DELIVERED) {
    throw new AppError(StatusCodes.BAD_REQUEST, "percel already DELIVERED");
  }

  parcel.status = newStatus;
  parcel.trackingEvents.push({
    location: `Updated by ${decodedToken.role}`,
    updatedBy: decodedToken.userId,
    status: newStatus,
    note: `this parcel updated by ${decodedToken.role}`,
  });

  await parcel.save();

  return { message: "Parcel updated successfully" };
};

const DeloveryHistory = async (userId: string) => {
  const isUserExsit = await User.findById(userId);
  console.log(isUserExsit);

  if (!isUserExsit) {
    throw new AppError(StatusCodes.NOT_FOUND, "user not found");
  }

  if (isUserExsit._id.toString() !== userId) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");
  }

  const deliveredParcels = await Parcel.find({
    reciver: userId,
    status: "DELIVERED",
  }).sort({ deliveriDate: -1 });

  if (deliveredParcels.length < 0) {
    throw new AppError(StatusCodes.NOT_FOUND, "no delivery percel found ");
  }
  return deliveredParcels;
};

export const parcelServices = {
  createParcel,
  getAllAdminPercel,
  incomingPercel,
  senderAllPercel,
  updateStatus,
  DeloveryHistory,
};
