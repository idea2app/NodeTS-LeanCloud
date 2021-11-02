"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInResponse = exports.SignInOAuthRequest = exports.SignInPhoneRequest = exports.SMSCodeRequest = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class SMSCodeRequest {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsMobilePhone)('zh-CN'),
    (0, tslib_1.__metadata)("design:type", String)
], SMSCodeRequest.prototype, "mobilePhoneNumber", void 0);
exports.SMSCodeRequest = SMSCodeRequest;
class SignInPhoneRequest extends SMSCodeRequest {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], SignInPhoneRequest.prototype, "verificationCode", void 0);
exports.SignInPhoneRequest = SignInPhoneRequest;
class SignInOAuthRequest {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], SignInOAuthRequest.prototype, "code", void 0);
exports.SignInOAuthRequest = SignInOAuthRequest;
class SignInResponse {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], SignInResponse.prototype, "token", void 0);
exports.SignInResponse = SignInResponse;
//# sourceMappingURL=Session.js.map