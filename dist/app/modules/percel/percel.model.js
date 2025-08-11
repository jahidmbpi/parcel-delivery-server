"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parcel = exports.percelSchema = exports.trakinSchema = void 0;
const mongoose_1 = require("mongoose");
const parcel_interface_1 = require("./parcel.interface");
exports.trakinSchema = new mongoose_1.Schema({
    location: { type: String },
    updatedBy: { type: mongoose_1.Schema.Types.String, ref: "User", required: true },
    status: { type: String },
    note: { type: String },
}, {
    timestamps: true,
});
exports.percelSchema = new mongoose_1.Schema({
    trakinId: { type: String, required: true, unique: true },
    type: { type: String, default: "other" },
    waight: { type: Number, required: true },
    sender: { type: mongoose_1.Schema.ObjectId, ref: "User", required: true },
    reciver: { type: mongoose_1.Schema.ObjectId, ref: "User", required: true },
    pickUpAddress: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    deliveriDate: { type: Date },
    fee: { type: Number },
    status: {
        type: String,
        enum: Object.values(parcel_interface_1.Status),
        default: parcel_interface_1.Status.REQUESTED,
    },
    trackingEvents: { type: [exports.trakinSchema], default: [] },
});
exports.Parcel = (0, mongoose_1.model)("Parcel", exports.percelSchema);
