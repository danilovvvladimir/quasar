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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const common_1 = require("@nestjs/common");
const review_service_1 = require("./review.service");
const review_dto_1 = require("./review.dto");
const user_1 = require("../decorators/user");
const role_1 = require("../decorators/role");
const roles_1 = require("../guard/roles");
const accessToken_1 = require("../guard/accessToken");
let ReviewController = class ReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async findAll() {
        return this.reviewService.findAll();
    }
    async findById(id) {
        return this.reviewService.findById(id);
    }
    async findByProductIdId(productId) {
        return this.reviewService.findByProductId(productId);
    }
    async findByUserId(userId) {
        return this.reviewService.findByUserId(userId);
    }
    async create(dto) {
        return this.reviewService.create(dto);
    }
    async update(id, userId, userRole, dto) {
        return this.reviewService.update(id, userId, userRole, dto);
    }
    async delete(id, userId, userRole) {
        return this.reviewService.delete(id, userId, userRole);
    }
};
exports.ReviewController = ReviewController;
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(accessToken_1.AccessTokenGuard, roles_1.RolesGuard),
    (0, role_1.Roles)("ADMIN", "SUPERADMIN"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "findAll", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)("by-id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "findById", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)("by-product/:productId"),
    __param(0, (0, common_1.Param)("productId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "findByProductIdId", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)("by-user/:userId"),
    (0, common_1.UseGuards)(accessToken_1.AccessTokenGuard),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "findByUserId", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(accessToken_1.AccessTokenGuard, roles_1.RolesGuard),
    (0, role_1.Roles)("ADMIN", "SUPERADMIN"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_dto_1.ReviewCreateDTO]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "create", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)(accessToken_1.AccessTokenGuard),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, user_1.CurrentUser)("id")),
    __param(2, (0, user_1.CurrentUser)("role")),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, review_dto_1.ReviewUpdateDTO]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "update", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(accessToken_1.AccessTokenGuard),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, user_1.CurrentUser)("id")),
    __param(2, (0, user_1.CurrentUser)("role")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "delete", null);
exports.ReviewController = ReviewController = __decorate([
    (0, common_1.Controller)("reviews"),
    __metadata("design:paramtypes", [review_service_1.ReviewService])
], ReviewController);
//# sourceMappingURL=review.controller.js.map