"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cretaeUserTocken = void 0;
const env_1 = require("../config/env");
const jwt_1 = require("./jwt");
const cretaeUserTocken = (user) => {
    const jwtPaload = {
        userId: user._id,
        email: user.email,
        role: user.role,
    };
    const accessTocken = (0, jwt_1.genaretTocken)(jwtPaload, env_1.envVars.JWT_ACCESS_SECRECT, env_1.envVars.JWT_ACCESS_EXPIRE);
    const refreshTocken = (0, jwt_1.genaretTocken)(jwtPaload, env_1.envVars.JWT_REFRESH_SECRECT, env_1.envVars.JWT_REFRESH_EXPIRE);
    return {
        accessTocken,
        refreshTocken,
    };
};
exports.cretaeUserTocken = cretaeUserTocken;
