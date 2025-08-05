import bcryptjs from "bcryptjs";
import AppError from "../../errorHelper/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { StatusCodes } from "http-status-codes";
import { cretaeUserTocken } from "../../utils/cretaeUserTocken";

const credentialLogIn = async (payload: Partial<IUser>) => {
  const { email, password } = payload;
  const isUserExsit = await User.findOne({ email });

  if (!isUserExsit) {
    throw new AppError(StatusCodes.NOT_FOUND, "user dose not exsit");
  }

  const matchPassword = await bcryptjs.compare(
    password as string,
    isUserExsit.password as string
  );

  if (!matchPassword) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      "invalid password. please provide valid password"
    );
  }
  const { password: _password, ...rest } = isUserExsit;
  const userTocken = cretaeUserTocken(isUserExsit);
  return {
    acccessTocken: userTocken.accessTocken,
    refreshTocken: userTocken.refreshTocken,
    user: rest,
  };
};

export const authServicecs = {
  credentialLogIn,
};
