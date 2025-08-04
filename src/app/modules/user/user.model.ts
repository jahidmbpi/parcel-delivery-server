import { model, Schema } from "mongoose";
import { IAuthProvider, isActive, IUser, Role } from "./user.interface";

const authProviderSchema = new Schema<IAuthProvider>(
  {
    provider: { type: String, required: true },
    providerID: { type: String, required: true },
  },
  { versionKey: false, _id: false }
);

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    phone: { type: String, unique: true },
    picture: { type: String },
    role: { type: String, enum: Object.values(Role), default: Role.RECEIVER },
    address: { type: String },
    isActive: {
      type: String,
      enum: Object.values(isActive),
      default: isActive.ACTIVE,
    },
    isDeleted: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    auth: [authProviderSchema],
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);
