"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handelCastError = void 0;
const handelCastError = (err) => {
    const errorSources = [
        {
            path: err.path || "",
            message: "Invalid MongoDB ObjectId. Please provide a valid ID.",
        },
    ];
    return {
        statusCode: 400,
        message: "Invalid MongoDB ObjectId. Please provide a valid ID.",
        errorSources,
    };
};
exports.handelCastError = handelCastError;
