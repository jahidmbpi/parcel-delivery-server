"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parcelServices = void 0;
const user_interface_1 = require("./../user/user.interface");
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const parcel_interface_1 = require("./parcel.interface");
const percel_model_1 = require("./percel.model");
const user_model_1 = require("../user/user.model");
const createParcel = (payload, decodedTocken) => __awaiter(void 0, void 0, void 0, function* () {
    const isExsitParcel = yield percel_model_1.Parcel.findOne({ trakinId: payload.trakinId });
    if (isExsitParcel) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "this percel alreday exist");
    }
    if (decodedTocken.role !== user_interface_1.Role.SENDER) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "You are not permitted to create a parcel");
    }
    const parcel = yield percel_model_1.Parcel.create(payload);
    return parcel;
});
//get all admin parcel
const getAllAdminPercel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
    }
    if (user.role !== user_interface_1.Role.ADMIN) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "you are not permited this route");
    }
    const adminParcel = yield percel_model_1.Parcel.find({});
    if (adminParcel.length < 0) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "no parcel");
    }
    return adminParcel;
});
//incoming percel for riciver
const incomingPercel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isreciver = yield user_model_1.User.findById(id);
    if (!isreciver) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "you are not authorized");
    }
    if (isreciver.role !== user_interface_1.Role.RECEIVER) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "you are not permited this route");
    }
    const parcels = yield percel_model_1.Parcel.find({ reciver: id });
    if (!parcels || parcels.length === 0) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "you have no parcel");
    }
    return parcels;
});
//all parcel for sender
const senderAllPercel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isSender = yield user_model_1.User.findById(id);
    if (!isSender) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "you are not authorized");
    }
    if (isSender.role !== user_interface_1.Role.SENDER) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "you are not permited this route");
    }
    const Senderparcels = yield percel_model_1.Parcel.find({ sender: id });
    if (!Senderparcels || Senderparcels.length === 0) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "you have no parcel");
    }
    return Senderparcels;
});
const updateStatus = (id, payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const newStatus = payload.status;
    const parcel = yield percel_model_1.Parcel.findById(id);
    if (!parcel) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Parcel not found");
    }
    if (parcel.status === newStatus) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Parcel already has this status");
    }
    if (newStatus === parcel_interface_1.Status.APPROVED) {
        if (decodedToken.role !== user_interface_1.Role.ADMIN) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "only admin can approve");
        }
    }
    if (parcel.status === parcel_interface_1.Status.DISPATCHED) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "percel already dispatch");
    }
    if (parcel.status === parcel_interface_1.Status.DELIVERED) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "percel already DELIVERED");
    }
    parcel.status = newStatus;
    parcel.trackingEvents.push({
        location: `Updated by ${decodedToken.role}`,
        updatedBy: decodedToken.userId,
        status: newStatus,
        note: `this parcel updated by ${decodedToken.role}`,
    });
    yield parcel.save();
    return { message: "Parcel updated successfully" };
});
const DeloveryHistory = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExsit = yield user_model_1.User.findById(userId);
    console.log(isUserExsit);
    if (!isUserExsit) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "user not found");
    }
    if (isUserExsit._id.toString() !== userId) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are not authorized");
    }
    const deliveredParcels = yield percel_model_1.Parcel.find({
        reciver: userId,
        status: "DELIVERED",
    }).sort({ deliveriDate: -1 });
    if (deliveredParcels.length < 0) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "no delivery percel found ");
    }
    return deliveredParcels;
});
const SearchByTrakingId = (trackingId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(trackingId);
    const singleParcel = yield percel_model_1.Parcel.findOne({ trakinId: trackingId });
    if (!singleParcel) {
        throw new AppError_1.default(404, "not found");
    }
    console.log(singleParcel);
    return singleParcel;
});
exports.parcelServices = {
    createParcel,
    getAllAdminPercel,
    incomingPercel,
    senderAllPercel,
    updateStatus,
    DeloveryHistory,
    SearchByTrakingId,
};
