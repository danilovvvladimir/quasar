"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductUpdateDTO = exports.ProductCategoryCreateDTO = exports.ProductImagesCreateDTO = exports.ProductDetailsCreateDTO = exports.ProductCreateDTO = void 0;
const class_validator_1 = require("class-validator");
class ProductCreateDTO {
}
exports.ProductCreateDTO = ProductCreateDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductCreateDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductCreateDTO.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductCreateDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProductCreateDTO.prototype, "currentPrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProductCreateDTO.prototype, "oldPrice", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], ProductCreateDTO.prototype, "details", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ProductCreateDTO.prototype, "imagePaths", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ProductCreateDTO.prototype, "categoryIds", void 0);
class ProductDetailsCreateDTO {
}
exports.ProductDetailsCreateDTO = ProductDetailsCreateDTO;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], ProductDetailsCreateDTO.prototype, "details", void 0);
class ProductImagesCreateDTO {
}
exports.ProductImagesCreateDTO = ProductImagesCreateDTO;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ProductImagesCreateDTO.prototype, "imagePaths", void 0);
class ProductCategoryCreateDTO {
}
exports.ProductCategoryCreateDTO = ProductCategoryCreateDTO;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ProductCategoryCreateDTO.prototype, "categoryIds", void 0);
class ProductUpdateDTO extends ProductCreateDTO {
}
exports.ProductUpdateDTO = ProductUpdateDTO;
//# sourceMappingURL=product.dto.js.map