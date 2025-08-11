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
exports.authServices = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const user_model_1 = require("../user/user.model");
const http_status_codes_1 = require("http-status-codes");
const cretaeUserTocken_1 = require("../../utils/cretaeUserTocken");
const env_1 = require("../../config/env");
const credentialLogIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExsit = yield user_model_1.User.findOne({ email });
    if (!isUserExsit) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "user dose not exsit");
    }
    const matchPassword = yield bcryptjs_1.default.compare(password, isUserExsit.password);
    if (!matchPassword) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "invalid password. please provide valid password");
    }
    const { password: _password } = isUserExsit, rest = __rest(isUserExsit, ["password"]);
    const userTocken = (0, cretaeUserTocken_1.cretaeUserTocken)(isUserExsit);
    return {
        acccessTocken: userTocken.accessTocken,
        refreshTocken: userTocken.refreshTocken,
        user: rest,
    };
});
const resetPassword = (oldPassword, newPassword, decodedTocken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(decodedTocken.userId);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "user not found");
    }
    const oldPasswordMatch = bcryptjs_1.default.compare(oldPassword, user.password);
    console.log(oldPasswordMatch);
    if (!oldPasswordMatch) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "invalid password");
    }
    const finalHashPass = yield bcryptjs_1.default.hash(newPassword, Number(env_1.envVars.BYCRIPT_SALT_ROUND));
    user.password = finalHashPass;
    yield user.save();
    return {
        messaage: "password upadted successfull",
    };
});
exports.authServices = {
    credentialLogIn,
    resetPassword,
};
