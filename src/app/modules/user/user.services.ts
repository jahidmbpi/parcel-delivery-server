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

  const updatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return updatedUser;
};

export const userServices = {
  createUser,
  updateUser,
};
