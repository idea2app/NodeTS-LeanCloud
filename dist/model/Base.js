"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseQuery = exports.CoordinateModel = exports.FileModel = exports.BaseModel = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const leancloud_storage_1 = require("leancloud-storage");
const LCObjectDataKeys = ['attributes', 'cid', 'changed'];
class BaseModel extends leancloud_storage_1.Object {
    constructor(data) {
        super();
        for (const key in data)
            if (Object.prototype.hasOwnProperty.call(data, key) &&
                key[0] !== '_' &&
                !LCObjectDataKeys.includes(key))
                this.set(key, data[key]);
    }
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, tslib_1.__metadata)("design:type", String)
], BaseModel.prototype, "objectId", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, tslib_1.__metadata)("design:type", Date)
], BaseModel.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, tslib_1.__metadata)("design:type", Date)
], BaseModel.prototype, "updatedAt", void 0);
exports.BaseModel = BaseModel;
class FileModel extends BaseModel {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], FileModel.prototype, "provider", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], FileModel.prototype, "bucket", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], FileModel.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsUrl)(),
    (0, tslib_1.__metadata)("design:type", String)
], FileModel.prototype, "url", void 0);
exports.FileModel = FileModel;
class CoordinateModel {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsPositive)(),
    (0, tslib_1.__metadata)("design:type", Number)
], CoordinateModel.prototype, "latitude", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsPositive)(),
    (0, tslib_1.__metadata)("design:type", Number)
], CoordinateModel.prototype, "longitude", void 0);
exports.CoordinateModel = CoordinateModel;
class BaseQuery {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, tslib_1.__metadata)("design:type", Number)
], BaseQuery.prototype, "pageSize", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, tslib_1.__metadata)("design:type", Number)
], BaseQuery.prototype, "pageIndex", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], BaseQuery.prototype, "keyword", void 0);
exports.BaseQuery = BaseQuery;
//# sourceMappingURL=Base.js.map