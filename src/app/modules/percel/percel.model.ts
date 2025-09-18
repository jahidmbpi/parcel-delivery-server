import { model, Schema } from "mongoose";
import { IPercel, ITrackingEvent, Status } from "./parcel.interface";

export const trakinSchema = new Schema<ITrackingEvent>(
  {
    location: { type: String },
    updatedBy: { type: Schema.Types.String, ref: "User", required: true },
    status: { type: String },
    note: { type: String },
  },
  {
    timestamps: true,
  }
);

export const percelSchema = new Schema<IPercel>({
  trakinId: { type: String, required: true, unique: true },
  type: { type: String, default: "other" },
  weight: { type: Number, required: true },
  sender: { type: Schema.ObjectId, ref: "User", required: true },
  reciver: { type: Schema.ObjectId, ref: "User", required: true },
  pickUpAddress: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  deliveriDate: { type: Date },
  fee: { type: Number },
  status: {
    type: String,
    enum: Object.values(Status),
    default: Status.REQUESTED,
  },
  trackingEvents: { type: [trakinSchema], default: [] },
});

export const Parcel = model<IPercel>("Parcel", percelSchema);
