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
exports.cheakAuth = void 0;
const user_interface_1 = require("../modules/user/user.interface");
const AppError_1 = __importDefault(require("../errorHelper/AppError"));
const http_status_codes_1 = require("http-status-codes");
const env_1 = require("../config/env");
const user_model_1 = require("../modules/user/user.model");
const jwt_1 = require("./jwt");
const cheakAuth = (...allawerRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const accessTocken = req.headers.authorization || req.cookies.accessToken;
            if (!accessTocken) {
                throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "you are not authorized");
            }
            if (!env_1.envVars.JWT_ACCESS_SECRECT) {
                throw new AppError_1.default(500, "Jwt secret is not configure");
            }
            const verifyedTocken = (0, jwt_1.verifyTocken)(accessTocken, env_1.envVars.JWT_ACCESS_SECRECT);
            const isUserExsit = yield user_model_1.User.findOne({ email: verifyedTocken.email });
            if (!isUserExsit) {
                throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "user dose not exsit");
            }
            if (isUserExsit.isActive === user_interface_1.isActive.BLOCKED) {
                throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "user is blocked");
            }
            if (isUserExsit.isDeleted) {
                throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "User is deleted");
            }
            const userRole = verifyedTocken === null || verifyedTocken === void 0 ? void 0 : verifyedTocken.role;
            if (!allawerRoles.includes(userRole)) {
                throw new AppError_1.default(403, "you are not permited this route");
            }
            req.user = verifyedTocken;
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.cheakAuth = cheakAuth;
