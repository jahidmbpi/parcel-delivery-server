"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handelValidationError = void 0;
const handelValidationError = (err) => {
    const errorSources = [];
    Object.values(err.errors).forEach((error) => {
        errorSources.push({
            path: error.path,
            message: error.message,
        });
    });
    return {
        statusCode: 400,
        message: "validation error",
        errorSources,
    };
};
exports.handelValidationError = handelValidationError;
