"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handelDuplicateError = void 0;
const handelDuplicateError = (err) => {
    const fieldName = Object.keys(err.keyValue || {})[0] || "Field";
    const errorSources = [
        {
            path: fieldName,
            message: `${fieldName} already exists`,
        },
    ];
    return {
        statusCode: 400,
        message: `${fieldName} already exists`,
        errorSources,
    };
};
exports.handelDuplicateError = handelDuplicateError;
