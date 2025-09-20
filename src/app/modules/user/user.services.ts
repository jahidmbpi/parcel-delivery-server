import mongoose from "mongoose";
import AppError from "../../errorHelper/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs";

import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;
  const isUserExsit = await User.findOne({ email });
  console.log(isUserExsit);

  if (isUserExsit) {
    throw new AppError(StatusCodes.BAD_REQUEST, "this user alreday exsit ");
  }

  const hashedPassword = await bcryptjs.hash(password as string, 10);
  console.log(hashedPassword);
  const authProvider: IAuthProvider = {
    provider: "credential",
    providerID: email as string,
  };

  const user = await User.create({
    email,
    auth: [authProvider],
    password: hashedPassword,
    ...rest,
  });

  return user;
};

const getAllUser = async () => {
  const allUser = await User.find({});
  return allUser;
};

const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedTocken: JwtPayload
) => {
  if (payload.role) {
    if (
      decodedTocken.role === Role.RECEIVER ||
      decodedTocken.role === Role.SENDER
    ) {
      throw new AppError(StatusCodes.FORBIDDEN, "you are unauthorized");
    }

    const isUserExsit = await User.findById(userId);

    if (!isUserExsit) {
      throw new AppError(StatusCodes.NOT_FOUND, "user not found");
    }

    if (decodedTocken.role !== Role.ADMIN) {
      throw new AppError(StatusCodes.FORBIDDEN, "you are unauthorized");
    }
  }

  if (
    decodedTocken.role === Role.RECEIVER ||
    decodedTocken.role === Role.SENDER
  ) {
    if (payload.isActive || payload.isDeleted || payload.isVerified) {
      throw new AppError(StatusCodes.FORBIDDEN, "you are not authorized");
    }
  }
  if (payload.isDeleted) {
    payload.isActive = "BLOCKED";
  }

  const updatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return updatedUser;
};

const getMe = async (userId: string) => {
  const isExsit = await User.findById(userId);
  if (!isExsit) {
    throw new AppError(404, "user not found");
  }
  if (isExsit.isDeleted === true) {
    throw new AppError(404, "you are not authorized");
  }

  if (isExsit.isActive === "BLOCKED") {
    throw new AppError(404, "you are not authorized");
  }
  if (isExsit._id.toString() !== userId) {
    throw new AppError(404, "you are not authorized");
  }

  return isExsit;
};

export const userServices = {
  createUser,
  updateUser,
  getAllUser,
  getMe,
};
