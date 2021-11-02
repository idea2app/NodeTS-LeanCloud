"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const leanengine_1 = require("leanengine");
const utility_1 = require("../utility");
const model_1 = require("../model");
let UserController = class UserController {
    getList({ keyword, pageSize: size, pageIndex: index }) {
        return (0, utility_1.fetchPage)(leanengine_1.Query.or(new leanengine_1.Query(leanengine_1.User).contains('username', keyword), new leanengine_1.Query(leanengine_1.User).contains('email', keyword), new leanengine_1.Query(leanengine_1.User).contains('mobilePhoneNumber', keyword)), { size, index }, { useMasterKey: true });
    }
    async getOne(id) {
        const user = await leanengine_1.Object.createWithoutData(leanengine_1.User, id).fetch();
        return user.toJSON();
    }
    async editUser(id, data) {
        return (await leanengine_1.Object.createWithoutData(leanengine_1.User, id).save(data, {
            useMasterKey: true
        })).toJSON();
    }
};
(0, tslib_1.__decorate)([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(model_1.UserRole.Admin),
    (0, routing_controllers_openapi_1.ResponseSchema)(model_1.UserList),
    (0, tslib_1.__param)(0, (0, routing_controllers_1.QueryParams)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [model_1.BaseQuery]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], UserController.prototype, "getList", null);
(0, tslib_1.__decorate)([
    (0, routing_controllers_1.Get)('/:id'),
    (0, routing_controllers_openapi_1.ResponseSchema)(model_1.UserModel),
    (0, tslib_1.__param)(0, (0, routing_controllers_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserController.prototype, "getOne", null);
(0, tslib_1.__decorate)([
    (0, routing_controllers_1.Patch)('/:id'),
    (0, routing_controllers_1.Authorized)(model_1.UserRole.Admin),
    (0, routing_controllers_openapi_1.ResponseSchema)(model_1.UserModel),
    (0, tslib_1.__param)(0, (0, routing_controllers_1.Param)('id')),
    (0, tslib_1.__param)(1, (0, routing_controllers_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, model_1.UserModel]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserController.prototype, "editUser", null);
UserController = (0, tslib_1.__decorate)([
    (0, routing_controllers_1.JsonController)('/user')
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=User.js.map