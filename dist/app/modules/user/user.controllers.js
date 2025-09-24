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
exports.userController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const http_status_codes_1 = require("http-status-codes");
const user_services_1 = require("./user.services");
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const sendResponse_1 = require("../../utils/sendResponse");
const createUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const result = yield user_services_1.userServices.createUser(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        success: true,
        message: "User created successfully",
        data: result,
    });
}));
const getAllUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allUser = yield user_services_1.userServices.getAllUser();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "all user get successfully",
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: allUser,
    });
}));
const getMe = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedTockent = req.user;
    if (!decodedTockent.userId) {
        throw new AppError_1.default(404, "you are not authorized");
    }
    const logedInUser = yield user_services_1.userServices.getMe(decodedTockent.userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "user profile retrived success",
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: logedInUser,
    });
}));
const updateUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const payload = req.body;
    const decodedTocken = req.user;
    console.log("update", userId, payload, decodedTocken);
    if (!decodedTocken) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Invalid token");
    }
    const updatedUser = yield user_services_1.userServices.updateUser(userId, payload, decodedTocken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "user updated successfully",
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: updatedUser,
    });
}));
exports.userController = {
    createUser,
    updateUser,
    getAllUser,
    getMe,
};
