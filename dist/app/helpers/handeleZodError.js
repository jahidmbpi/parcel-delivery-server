"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handeleZodError = void 0;
const handeleZodError = (err) => {
    const errorSources = err.issues.map((issue) => {
        var _a;
        return ({
            path: ((_a = issue.path[issue.path.length - 1]) === null || _a === void 0 ? void 0 : _a.toString()) || "",
            message: issue.message,
        });
    });
    return {
        statusCode: 400,
        message: "Zod validation error",
        errorSources,
    };
};
exports.handeleZodError = handeleZodError;
