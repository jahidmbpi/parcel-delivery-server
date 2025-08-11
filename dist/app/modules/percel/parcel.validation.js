"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePerceldZodSchema = exports.percelZodSchema = void 0;
const zod_1 = require("zod");
const parcel_interface_1 = require("./parcel.interface");
const trackingEventSchema = zod_1.z.object({
    location: zod_1.z.string(),
    status: zod_1.z.string(),
    updatedBy: zod_1.z.string().optional(),
    note: zod_1.z.string().optional(),
});
exports.percelZodSchema = zod_1.z.object({
    trakinId: zod_1.z
        .string()
        .min(10, { message: "traking is must be at least 10 charecter long" })
        .max(50, { message: "traking id exceed 15 charecter" })
        .regex(/^TRK-\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])-[A-Za-z0-9]{6}$/, {
        message: "trackingId must be in format: TRK-YYYYMMDD-XXXXXX (e.g. TRK-20230809-1A2B3C)",
    }),
    type: zod_1.z.string({ message: "parcel wight must be string" }).optional(),
    waight: zod_1.z.number({ message: "parcel wight must be number" }).optional(),
    sender: zod_1.z.string(),
    reciver: zod_1.z.string(),
    pickUpAddress: zod_1.z
        .string()
        .min(2, { message: "pickUpAddress is must be at least 2 charecter long" })
        .max(50, { message: "pickUpAddress id exceed 50 charecter" }),
    deliveryAddress: zod_1.z
        .string()
        .min(2, { message: "pickUpAddress is must be at least 2 charecter long" })
        .max(50, { message: "pickUpAddress id exceed 50 charecter" }),
    deliveriDate: zod_1.z.date(),
    fee: zod_1.z.number().min(1, { message: "fee  must be at least 1 charecter long" }),
    status: zod_1.z.enum(Object.values(parcel_interface_1.Status)).optional(),
    trackingEvents: zod_1.z.array(trackingEventSchema).optional(),
});
exports.updatePerceldZodSchema = zod_1.z.object({
    type: zod_1.z.string({ message: "parcel wight must be string" }).optional(),
    waight: zod_1.z.number({ message: "parcel wight must be number" }).optional(),
    sender: zod_1.z.string().optional(),
    reciver: zod_1.z.string().optional(),
    pickUpAddress: zod_1.z
        .string()
        .min(2, { message: "pickUpAddress is must be at least 2 charecter long" })
        .max(50, { message: "pickUpAddress id exceed 50 charecter" })
        .optional(),
    deliveryAddress: zod_1.z
        .string()
        .min(2, { message: "pickUpAddress is must be at least 2 charecter long" })
        .max(50, { message: "pickUpAddress id exceed 50 charecter" })
        .optional(),
    deliveriDate: zod_1.z.string().optional(),
    fee: zod_1.z
        .number()
        .min(1, { message: "fee  must be at least 1 charecter long" })
        .optional(),
    status: zod_1.z.enum(Object.values(parcel_interface_1.Status)).optional(),
    trackingEvents: zod_1.z.array(trackingEventSchema).optional().optional(),
});
