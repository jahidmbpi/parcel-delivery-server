import { object, z } from "zod";
import { Status } from "./parcel.interface";

const trackingEventSchema = z.object({
  location: z.string(),
  status: z.string(),
  updatedBy: z.string().optional(),
  note: z.string().optional(),
});

export const percelZodSchema = z.object({
  trakinId: z
    .string()
    .min(10, { message: "traking is must be at least 10 charecter long" })
    .max(50, { message: "traking id exceed 15 charecter" })
    .regex(/^TRK-\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])-[A-Za-z0-9]{6}$/, {
      message:
        "trackingId must be in format: TRK-YYYYMMDD-XXXXXX (e.g. TRK-20230809-1A2B3C)",
    }),
  type: z.string({ message: "parcel wight must be string" }).optional(),
  weight: z.number({ message: "parcel wight must be number" }).optional(),
  sender: z.string(),
  reciver: z.string(),
  pickUpAddress: z
    .string()
    .min(2, { message: "pickUpAddress is must be at least 2 charecter long" })
    .max(50, { message: "pickUpAddress id exceed 50 charecter" }),
  deliveryAddress: z
    .string()
    .min(2, { message: "pickUpAddress is must be at least 2 charecter long" })
    .max(50, { message: "pickUpAddress id exceed 50 charecter" }),
  deliveriDate: z
    .string()
    .transform((val) => new Date(val))
    .optional(),
  fee: z.number().min(1, { message: "fee  must be at least 1 charecter long" }),
  status: z.enum(Object.values(Status) as [string]).optional(),
  trackingEvents: z.array(trackingEventSchema).optional(),
});

export const updatePerceldZodSchema = z.object({
  type: z.string({ message: "parcel wight must be string" }).optional(),
  weight: z.number({ message: "parcel wight must be number" }).optional(),
  sender: z.string().optional(),
  reciver: z.string().optional(),
  pickUpAddress: z
    .string()
    .min(2, { message: "pickUpAddress is must be at least 2 charecter long" })
    .max(50, { message: "pickUpAddress id exceed 50 charecter" })
    .optional(),
  deliveryAddress: z
    .string()
    .min(2, { message: "pickUpAddress is must be at least 2 charecter long" })
    .max(50, { message: "pickUpAddress id exceed 50 charecter" })
    .optional(),
  deliveriDate: z.string().optional(),
  fee: z
    .number()
    .min(1, { message: "fee  must be at least 1 charecter long" })
    .optional(),
  status: z.enum(Object.values(Status) as [string]).optional(),

  trackingEvents: z.array(trackingEventSchema).optional().optional(),
});
