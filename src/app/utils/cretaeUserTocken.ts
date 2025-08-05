import { envVars } from "../config/env";
import { IUser, Role } from "../modules/user/user.interface";
import { genaretTocken } from "./jwt";

export const cretaeUserTocken = (user: Partial<IUser>) => {
  const jwtPaload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessTocken = genaretTocken(
    jwtPaload,
    envVars.JWT_ACCESS_SECRECT,
    envVars.JWT_ACCESS_EXPIRE
  );

  const refreshTocken = genaretTocken(
    jwtPaload,
    envVars.JWT_REFRESH_SECRECT,
    envVars.JWT_REFRESH_EXPIRE
  );

  return {
    accessTocken,
    refreshTocken,
  };
};
