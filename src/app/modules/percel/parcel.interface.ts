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
  note?: string;
  timestamp: Date;
}
export interface IPercel {
  trakinId: string;
  type: "document" | "box" | "fragile" | "other";
  waight: number;
  sender: Types.ObjectId;
  reciver: Types.ObjectId;
  picUpAddress: string;
  deliveryAddress: string;
  deliverydate: Date;
  fee: number;
  status: Status;
  trackingEvents: ITrackingEvent[];
}
