"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const LoadEnvVariable = () => {
    const requiredvariable = [
        "PORT",
        "DB_URL",
        "NODE_ENV",
        "BYCRIPT_SALT_ROUND",
        "JWT_ACCESS_SECRECT",
        "JWT_ACCESS_EXPIRE",
        "JWT_REFRESH_SECRECT",
        "JWT_REFRESH_EXPIRE",
        "CLOUDENARY_NAME",
        "CLOUDENARY_API_KEY",
        "CLOUDENARY_API_SECRET",
        "FRONTEND_URL",
    ];
    requiredvariable.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`missing environment variable ${key}`);
        }
    });
    return {
        PORT: process.env.PORT,
        DB_URL: process.env.DB_URL,
        NODE_ENV: process.env.DB_URL,
        BYCRIPT_SALT_ROUND: process.env.BYCRIPT_SALT_ROUND,
        JWT_ACCESS_SECRECT: process.env.JWT_ACCESS_SECRECT,
        JWT_ACCESS_EXPIRE: process.env.JWT_ACCESS_EXPIRE,
        JWT_REFRESH_SECRECT: process.env.JWT_ACCESS_SECRECT,
        JWT_REFRESH_EXPIRE: process.env.JWT_ACCESS_EXPIRE,
        FRONTEND_URL: process.env.FRONTEND_URL,
        CLOUDENARY: {
            CLOUDENARY_NAME: process.env.CLOUDENARY_NAME,
            CLOUDENARY_API_KEY: process.env.CLOUDENARY_API_KEY,
            CLOUDENARY_API_SECRET: process.env.CLOUDENARY_API_SECRET,
        },
    };
};
exports.envVars = LoadEnvVariable();
