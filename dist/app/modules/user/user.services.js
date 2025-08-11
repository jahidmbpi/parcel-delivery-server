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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const user_interface_1 = require("./user.interface");
const user_model_1 = require("./user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_codes_1 = require("http-status-codes");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload, rest = __rest(payload, ["email", "password"]);
    const isUserExsit = yield user_model_1.User.findOne({ email });
    console.log(isUserExsit);
    if (isUserExsit) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "this user alreday exsit ");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    console.log(hashedPassword);
    const authProvider = {
        provider: "credential",
        providerID: email,
    };
    const user = yield user_model_1.User.create(Object.assign({ email, auth: [authProvider], password: hashedPassword }, rest));
    return user;
});
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUser = yield user_model_1.User.find({});
    return allUser;
});
const updateUser = (userId, payload, decodedTocken) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.role) {
        if (decodedTocken.role === user_interface_1.Role.RECEIVER ||
            decodedTocken.role === user_interface_1.Role.SENDER) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "you are unauthorized");
        }
        const isUserExsit = yield user_model_1.User.findById(userId);
        if (!isUserExsit) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "user not found");
        }
        if (decodedTocken.role !== user_interface_1.Role.ADMIN) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "you are unauthorized");
        }
    }
    if (decodedTocken.role === user_interface_1.Role.RECEIVER ||
        decodedTocken.role === user_interface_1.Role.SENDER) {
        if (payload.isActive || payload.isDeleted || payload.isVerified) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "you are not authorized");
        }
    }
    const updatedUser = yield user_model_1.User.findByIdAndUpdate(userId, payload, {
        new: true,
        runValidators: true,
    });
    return updatedUser;
});
exports.userServices = {
    createUser,
    updateUser,
    getAllUser,
};
