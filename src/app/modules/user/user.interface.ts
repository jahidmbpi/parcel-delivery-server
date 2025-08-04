import { Types } from "mongoose";

export enum isActive {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}
export enum Role {
  SENDER = "SENDER",
  ADMIN = "ADMIN",
  RECEIVER = "RECEIVER",
}
export interface IAuthProvider {
  provider: "google" | "credential";
  providerID: string;
}
export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone?: string;
  picture?: string;
  role: Role;
  address?: string;
  isActive?: string;
  isDeleted?: boolean;
  isVerified: boolean;
  auth?: IAuthProvider[];
  percel?: Types.ObjectId[];
}
