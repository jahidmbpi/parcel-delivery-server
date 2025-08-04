import { envVars } from "../../config/env";
import AppError from "../../errorHelper/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs";

import { StatusCodes } from "http-status-codes";
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

export const userServices = {
  createUser,
};
