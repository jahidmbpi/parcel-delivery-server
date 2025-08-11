"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controllers_1 = require("./user.controllers");
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const user_validation_1 = require("./user.validation");
const cheakAuth_1 = require("../../utils/cheakAuth");
const user_interface_1 = require("./user.interface");
const router = (0, express_1.Router)();
router.post("/register", (0, validateRequest_1.default)(user_validation_1.userZodSchema), user_controllers_1.userController.createUser);
router.get("/", (0, cheakAuth_1.cheakAuth)(user_interface_1.Role.ADMIN), user_controllers_1.userController.getAllUser);
router.patch("/update/:id", (0, cheakAuth_1.cheakAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.RECEIVER, user_interface_1.Role.SENDER), (0, validateRequest_1.default)(user_validation_1.updatedUserZodSchema), user_controllers_1.userController.updateUser);
exports.userRoutes = router;
