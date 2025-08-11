import { Types } from "mongoose";

export enum Status {
  REQUESTED = "REQUESTED",
  APPROVED = "APPROVED",
  DISPATCHED = "DISPATCHED",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
}

export interface ITrackingEvent {
  location: string;
  status: string;
  updatedBy: string;
  note?: string;
  timestamp?: Date;
}
export interface IPercel {
  _id?: Types.ObjectId;
  trakinId: string;
  type: "document" | "box" | "fragile" | "other";
  waight: number;
  sender: Types.ObjectId;
  reciver: Types.ObjectId;
  pickUpAddress: string;
  deliveryAddress: string;
  deliveriDate: Date;
  fee: number;
  status: Status;
  trackingEvents: ITrackingEvent[];
}
