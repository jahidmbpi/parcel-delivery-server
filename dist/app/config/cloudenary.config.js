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
exports.coudenaryupload = exports.deleteImageCloudenary = void 0;
const cloudinary_1 = require("cloudinary");
const env_1 = require("./env");
const AppError_1 = __importDefault(require("../errorHelper/AppError"));
cloudinary_1.v2.config({
    cloud_name: env_1.envVars.CLOUDENARY.CLOUDENARY_NAME,
    api_key: env_1.envVars.CLOUDENARY.CLOUDENARY_API_KEY,
    api_secret: env_1.envVars.CLOUDENARY.CLOUDENARY_API_SECRET,
});
const deleteImageCloudenary = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const regex = /\/v\d+\/(.*?)\.(jpg|jpeg|png|gif|webp)$/i;
        const Match = url.match(regex);
        if (Match && Match[1]) {
            const public_id = Match[1];
            yield cloudinary_1.v2.uploader.destroy(public_id);
            console.log(`file${public_id} is deleted success`);
        }
    }
    catch (error) {
        console.log(error);
        throw new AppError_1.default(401, "not match");
    }
});
exports.deleteImageCloudenary = deleteImageCloudenary;
exports.coudenaryupload = cloudinary_1.v2;
