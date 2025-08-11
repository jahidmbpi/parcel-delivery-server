"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedUserZodSchema = exports.userZodSchema = exports.authProviderSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_interface_1 = require("./user.interface");
exports.authProviderSchema = zod_1.default.object({
    provider: zod_1.default.string(),
    providerID: zod_1.default.string(),
});
exports.userZodSchema = zod_1.default.object({
    name: zod_1.default
        .string()
        .min(2, { message: "name must be at least 2 charecter" })
        .max(50, {
        message: "name can not exceed 50 charecter",
    }),
    email: zod_1.default
        .string()
        .email({ message: "invalid email address format" })
        .min(5, {
        message: "email must be 5 charecter long",
    })
        .max(100, {
        message: "email can not excceed 100 charecter",
    }),
    password: zod_1.default.string().regex(/(?=.*[A-Z])/, {
        message: "password must containt at least 1 upercase letter",
    }),
    phone: zod_1.default
        .string()
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message: "phone number must be  valid for bangladesh.Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
        .optional(),
    picture: zod_1.default.string().optional(),
    role: zod_1.default.enum(Object.values(user_interface_1.Role)).optional(),
    address: zod_1.default
        .string()
        .max(200, { message: "address can not exceed 200 charecter long" })
        .optional(),
    isActive: zod_1.default.enum(Object.values(user_interface_1.isActive)).optional(),
    isDeleted: zod_1.default.boolean().optional(),
    isVerified: zod_1.default.boolean().optional(),
    auth: zod_1.default.array(exports.authProviderSchema).optional(),
});
exports.updatedUserZodSchema = zod_1.default.object({
    name: zod_1.default
        .string()
        .min(2, { message: "name must be at least 2 charecter" })
        .max(50, {
        message: "name can not exceed 50 charecter",
    })
        .optional(),
    email: zod_1.default
        .string()
        .email({ message: "invalid email address format" })
        .min(5, {
        message: "email must be 5 charecter long",
    })
        .max(100, {
        message: "email can not excceed 100 charecter",
    })
        .optional(),
    password: zod_1.default.string().regex(/(?=.*[A-Z])/, {
        message: "password must containt at least 1 upercase letter",
    }),
    phone: zod_1.default
        .string()
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message: "phone number must be  valid for bangladesh.Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
        .optional(),
    picture: zod_1.default.string().optional(),
    role: zod_1.default.enum(Object.values(user_interface_1.Role)).optional(),
    address: zod_1.default
        .string()
        .max(200, { message: "address can not exceed 200 charecter long" })
        .optional(),
    isActive: zod_1.default.enum(Object.values(user_interface_1.isActive)).optional(),
    isDeleted: zod_1.default.boolean().optional(),
    isVerified: zod_1.default.boolean().optional(),
    auth: zod_1.default.array(exports.authProviderSchema).optional(),
});
