"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const koa_1 = (0, tslib_1.__importDefault)(require("koa"));
const koa_logger_1 = (0, tslib_1.__importDefault)(require("koa-logger"));
const koa_jwt_1 = (0, tslib_1.__importDefault)(require("koa-jwt"));
const routing_controllers_1 = require("routing-controllers");
const leanengine_1 = require("leanengine");
const koagger_1 = require("koagger");
const controller_1 = (0, tslib_1.__importDefault)(require("./controller"));
const { LEANCLOUD_APP_ID: appId, LEANCLOUD_APP_KEY: appKey, LEANCLOUD_APP_MASTER_KEY: masterKey } = process.env;
const { swagger, router } = (0, koagger_1.createAPI)({ controllers: controller_1.default });
(0, leanengine_1.init)({ appId, appKey, masterKey });
const app = new koa_1.default()
    .use((0, koa_logger_1.default)())
    .use((0, leanengine_1.koa2)())
    .use(swagger())
    .use((0, koa_jwt_1.default)({ secret: appKey, passthrough: true }));
(0, routing_controllers_1.useKoaServer)(app, Object.assign({ cors: { credentials: true }, authorizationChecker: ({ context: { state } }, required_roles) => {
        if (!state.user)
            return false;
        const { roles } = state.user;
        return required_roles[0]
            ? roles === null || roles === void 0 ? void 0 : roles.some(role => required_roles.includes(role))
            : true;
    }, currentUserChecker: ({ context: { state } }) => leanengine_1.User.become(state.user.token) }, router));
exports.default = app;
//# sourceMappingURL=WebServer.js.map