"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = exports.authProviderSchema = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
exports.authProviderSchema = new mongoose_1.Schema({
    provider: { type: String, required: true },
    providerID: { type: String, required: true },
}, { versionKey: false, _id: false });
exports.userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: { type: String, required: true },
    phone: { type: String },
    picture: { type: String },
    role: { type: String, enum: Object.values(user_interface_1.Role), default: user_interface_1.Role.RECEIVER },
    address: { type: String },
    isActive: {
        type: String,
        enum: Object.values(user_interface_1.isActive),
        default: user_interface_1.isActive.ACTIVE,
    },
    isDeleted: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    auth: [exports.authProviderSchema],
    percel: [{ type: mongoose_1.Types.ObjectId, ref: "percel" }],
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)("User", exports.userSchema);
