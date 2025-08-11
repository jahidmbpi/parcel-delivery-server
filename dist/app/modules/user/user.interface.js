"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.isActive = void 0;
var isActive;
(function (isActive) {
    isActive["ACTIVE"] = "ACTIVE";
    isActive["BLOCKED"] = "BLOCKED";
})(isActive || (exports.isActive = isActive = {}));
var Role;
(function (Role) {
    Role["SENDER"] = "SENDER";
    Role["ADMIN"] = "ADMIN";
    Role["RECEIVER"] = "RECEIVER";
})(Role || (exports.Role = Role = {}));
