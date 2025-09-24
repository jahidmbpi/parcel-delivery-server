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
exports.authController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const http_status_codes_1 = require("http-status-codes");
const sendResponse_1 = require("../../utils/sendResponse");
const setCoockie_1 = require("../../utils/setCoockie");
const auth_services_1 = require("./auth.services");
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const env_1 = require("../../config/env");
const credentialLogIn = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const loginInfo = yield auth_services_1.authServices.credentialLogIn(req.body);
    (0, setCoockie_1.setAuthCookie)(res, {
        accessToken: loginInfo.acccessTocken,
        refreshToken: loginInfo.refreshTocken,
    });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        success: true,
        message: "User login successfully",
        data: {
            accessToken: loginInfo.acccessTocken,
            refreshToken: loginInfo.refreshTocken,
        },
    });
}));
const logOut = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: env_1.envVars.NODE_ENV === "production",
        sameSite: env_1.envVars.NODE_ENV === "production" ? "none" : "lax",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: env_1.envVars.NODE_ENV === "production",
        sameSite: env_1.envVars.NODE_ENV === "production" ? "none" : "lax",
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "user log out successfully",
        data: null,
    });
}));
const resetPssword = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    if (!req.user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "unauthorized request");
    }
    const decodedTocken = req.user;
    const finalpass = yield auth_services_1.authServices.resetPassword(oldPassword, newPassword, decodedTocken);
    console.log("resetPss", finalpass);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Password updated successfully",
        data: null,
    });
}));
exports.authController = {
    credentialLogIn,
    logOut,
    resetPssword,
};
