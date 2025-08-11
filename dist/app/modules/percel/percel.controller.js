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
exports.percelController = void 0;
const parcel_services_1 = require("./parcel.services");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const http_status_codes_1 = require("http-status-codes");
const sendResponse_1 = require("../../utils/sendResponse");
const createPercel = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const decodedTocken = req.user;
    console.log(decodedTocken);
    if (!decodedTocken) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "you are not authorized");
    }
    const parcelInfo = yield parcel_services_1.parcelServices.createParcel(payload, decodedTocken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "percel created successfuly",
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: parcelInfo,
    });
}));
//incomi percel fior riviver
const incomingParcel = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const parcelInfo = yield parcel_services_1.parcelServices.incomingPercel(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "all incoming percel for riciver percel heare",
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: parcelInfo,
    });
}));
//get percel for sender
const senderParcel = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const senderId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const parcelinfo = yield parcel_services_1.parcelServices.senderAllPercel(senderId);
    console.log(parcelinfo);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "all incoming percel for sender percel heare",
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: parcelinfo,
    });
}));
const getPercelForAdmin = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const result = yield parcel_services_1.parcelServices.getAllAdminPercel(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "all admin percel heare",
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const updateStatus = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const percelId = req.params.id;
    const payload = req.body;
    if (!req.user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "you are not authorized");
    }
    const decodedToken = req.user;
    const updatedInfo = yield parcel_services_1.parcelServices.updateStatus(percelId, payload, decodedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "updated status success",
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: updatedInfo,
    });
}));
exports.percelController = {
    createPercel,
    getPercelForAdmin,
    updateStatus,
    incomingParcel,
    senderParcel,
};
