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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_1 = require("../decorators/user");
const role_1 = require("../decorators/role");
const accessToken_1 = require("../guard/accessToken");
const roles_1 = require("../guard/roles");
const user_dto_1 = require("./user.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findAll() {
        return this.userService.findAll();
    }
    async getStatistics() {
        return this.userService.getStatistics();
    }
    async getProfile(id) {
        return this.userService.findById(id);
    }
    async findById(id) {
        return this.userService.findById(id);
    }
    async findByEmail(email) {
        return this.userService.findByEmail(email);
    }
    async findOrders(userId) {
        return this.userService.findOrders(userId);
    }
    async findWishlistItems(userId) {
        return this.userService.findWishlistItems(userId);
    }
    async findCartItems(userId) {
        return this.userService.findCartItems(userId);
    }
    async createCartItem(dto) {
        return this.userService.createCartItem(dto);
    }
    async toggleWishlistItem(dto) {
        return this.userService.toggleWishlistItems(dto);
    }
    async deleteCartItem(id) {
        return this.userService.deleteCartItem(id);
    }
    async updateCartItemQuantity(id, newQuantity) {
        return this.userService.updateCartItem(id, newQuantity);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(accessToken_1.AccessTokenGuard, roles_1.RolesGuard),
    (0, role_1.Roles)("ADMIN", "SUPERADMIN"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)("statistics"),
    (0, common_1.UseGuards)(accessToken_1.AccessTokenGuard, roles_1.RolesGuard),
    (0, role_1.Roles)("ADMIN", "SUPERADMIN"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)("profile"),
    (0, common_1.UseGuards)(accessToken_1.AccessTokenGuard),
    __param(0, (0, user_1.CurrentUser)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)("by-id/:id"),
    (0, common_1.UseGuards)(accessToken_1.AccessTokenGuard, roles_1.RolesGuard),
    (0, role_1.Roles)("ADMIN", "SUPERADMIN"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findById", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)("by-email/:email"),
    (0, common_1.UseGuards)(accessToken_1.AccessTokenGuard, roles_1.RolesGuard),
    (0, role_1.Roles)("ADMIN", "SUPERADMIN"),
    __param(0, (0, common_1.Param)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findByEmail", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(":userId/orders"),
    (0, common_1.UseGuards)(accessToken_1.AccessTokenGuard),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOrders", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(":userId/wishlist-items"),
    (0, common_1.UseGuards)(accessToken_1.AccessTokenGuard),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findWishlistItems", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(":userId/cart-items"),
    (0, common_1.UseGuards)(accessToken_1.AccessTokenGuard),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findCartItems", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("/cart-item"),
    (0, common_1.UseGuards)(accessToken_1.AccessTokenGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CartItemCreateDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createCartItem", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("/wishlist-item/:id"),
    (0, common_1.UseGuards)(accessToken_1.AccessTokenGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.WishlistItemToggleDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "toggleWishlistItem", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)("/cart-item/:id"),
    (0, common_1.UseGuards)(accessToken_1.AccessTokenGuard),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteCartItem", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Put)("/cart-items/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateCartItemQuantity", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map