import z, { email, object } from "zod";
import { isActive, Role } from "./user.interface";

export const authProviderSchema = z.object({
  provider: z.string(),
  providerID: z.string(),
});
export const userZodSchema = z.object({
  name: z
    .string()
    .min(2, { message: "name must be at least 2 charecter" })
    .max(50, {
      message: "name can not exceed 50 charecter",
    }),
  email: z
    .string()
    .email({ message: "invalid email address format" })
    .min(5, {
      message: "email must be 5 charecter long",
    })
    .max(100, {
      message: "email can not excceed 100 charecter",
    }),
  password: z.string().regex(/(?=.*[A-Z])/, {
    message: "password must containt at least 1 upercase letter",
  }),
  phone: z
    .string()
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "phone number must be  valid for bangladesh.Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),
  picture: z.string().optional(),
  role: z.enum(Object.values(Role) as [string]).optional(),
  address: z
    .string()
    .max(200, { message: "address can not exceed 200 charecter long" })
    .optional(),
  isActive: z.enum(Object.values(isActive) as [string]).optional(),
  isDeleted: z.boolean().optional(),
  isVerified: z.boolean().optional(),
  auth: z.array(authProviderSchema).optional(),
});

export const updatedUserZodSchema = z.object({
  name: z
    .string()
    .min(2, { message: "name must be at least 2 charecter" })
    .max(50, {
      message: "name can not exceed 50 charecter",
    })
    .optional(),
  email: z
    .string()
    .email({ message: "invalid email address format" })
    .min(5, {
      message: "email must be 5 charecter long",
    })
    .max(100, {
      message: "email can not excceed 100 charecter",
    })
    .optional(),
  password: z
    .string()
    .regex(/(?=.*[A-Z])/, {
      message: "password must containt at least 1 upercase letter",
    })
    .optional(),
  phone: z
    .string()
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "phone number must be  valid for bangladesh.Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),
  picture: z.string().optional(),
  role: z.enum(Object.values(Role) as [string]).optional(),
  address: z
    .string()
    .max(200, { message: "address can not exceed 200 charecter long" })
    .optional(),
  isActive: z.enum(Object.values(isActive) as [string]).optional(),
  isDeleted: z.boolean().optional(),
  isVerified: z.boolean().optional(),
  auth: z.array(authProviderSchema).optional(),
});
