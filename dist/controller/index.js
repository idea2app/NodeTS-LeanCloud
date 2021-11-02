"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Session_1 = require("./Session");
const User_1 = require("./User");
(0, tslib_1.__exportStar)(require("./Session"), exports);
(0, tslib_1.__exportStar)(require("./User"), exports);
exports.default = [User_1.UserController, Session_1.SessionController];
//# sourceMappingURL=index.js.map