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
exports.globalErrorhandelar = void 0;
const handeleDuplicateError_1 = require("../../helpers/handeleDuplicateError");
const handeleZodError_1 = require("../../helpers/handeleZodError");
const zod_1 = require("zod");
const hendeleCstError_1 = require("../../helpers/hendeleCstError");
const handeleValidationError_1 = require("../../helpers/handeleValidationError");
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const cloudenary_config_1 = require("../../config/cloudenary.config");
const globalErrorhandelar = (err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => __awaiter(void 0, void 0, void 0, function* () {
    let statusCode = 500;
    let message = "Something went wrong!";
    let errorSources = [];
    if (req.file) {
        yield (0, cloudenary_config_1.deleteImageCloudenary)(req.file.path);
    }
    // MongoDB duplicate key error
    if (err.code === 11000) {
        const simplified = (0, handeleDuplicateError_1.handelDuplicateError)(err);
        statusCode = simplified.statusCode;
        message = simplified.message;
    }
    if (req.files &&
        Array.isArray(req.files) &&
        req.files.length > 0) {
        const imageUrls = req.files.map((file) => file.path);
        yield Promise.all(imageUrls.map((url) => (0, cloudenary_config_1.deleteImageCloudenary)(url)));
    }
    // Zod validation error
    else if (err instanceof zod_1.ZodError) {
        const simplified = (0, handeleZodError_1.handeleZodError)(err);
        statusCode = simplified.statusCode;
        message = simplified.message;
        errorSources = simplified.errorSources || [];
    }
    // Cast error (invalid ObjectId)
    else if (err.name === "CastError") {
        const simplified = (0, hendeleCstError_1.handelCastError)(err);
        statusCode = simplified.statusCode;
        message = simplified.message;
        errorSources = simplified.errorSources || [];
    }
    // Mongoose validation error
    else if (err.name === "ValidationError") {
        const simplified = (0, handeleValidationError_1.handelValidationError)(err);
        statusCode = simplified.statusCode;
        message = simplified.message;
        errorSources = simplified.errorSources || [];
    }
    // Custom AppError
    else if (err instanceof AppError_1.default) {
        statusCode = err.statuscode;
        message = err.message;
    }
    // Generic Error
    else if (err instanceof Error) {
        message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
    });
});
exports.globalErrorhandelar = globalErrorhandelar;
