"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTocken = exports.genaretTocken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const genaretTocken = (jwtPaload, secret, expiresIn) => {
    const tocken = jsonwebtoken_1.default.sign(jwtPaload, secret, { expiresIn });
    return tocken;
};
exports.genaretTocken = genaretTocken;
const verifyTocken = (tocken, secret) => {
    const verifyTocken = jsonwebtoken_1.default.verify(tocken, secret);
    return verifyTocken;
};
exports.verifyTocken = verifyTocken;
