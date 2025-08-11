"use strict";
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
const globalErrorhandelar = (err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    let statusCode = 500;
    let message = "Something went wrong!";
    let errorSources = [];
    // MongoDB duplicate key error
    if (err.code === 11000) {
        const simplified = (0, handeleDuplicateError_1.handelDuplicateError)(err);
        statusCode = simplified.statusCode;
        message = simplified.message;
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
};
exports.globalErrorhandelar = globalErrorhandelar;
