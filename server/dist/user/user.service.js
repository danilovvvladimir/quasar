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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_1 = require("../constants/user");
const prisma_service_1 = require("../database/prisma.service");
const product_service_1 = require("../product/product.service");
let UserService = class UserService {
    constructor(prismaService, productService) {
        this.prismaService = prismaService;
        this.productService = productService;
    }
    async findAll() {
        const users = await this.prismaService.user.findMany();
        return users;
    }
    async findById(id) {
        const user = await this.prismaService.user.findUnique({
            where: { id },
            include: {
                review: true,
                cartItem: true,
                wishlistItem: true,
                order: {
                    include: {
                        orderItem: true,
                    },
                },
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(user_1.USER_NOT_FOUND_MESSAGE);
        }
        return user;
    }
    async findByEmail(email) {
        const user = await this.prismaService.user.findUnique({
            where: { email },
            include: { cartItem: true, wishlistItem: true },
        });
        if (!user) {
            throw new common_1.NotFoundException(user_1.USER_NOT_FOUND_MESSAGE);
        }
        return user;
    }
    async findOrders(userId) {
        await this.findById(userId);
        const orders = await this.prismaService.order.findMany({
            where: { userId },
        });
        return orders;
    }
    async findWishlistItems(userId) {
        await this.findById(userId);
        const wishlistItems = await this.prismaService.wishlistItem.findMany({
            where: { userId },
        });
        return wishlistItems;
    }
    async findCartItems(userId) {
        await this.findById(userId);
        const cartItems = await this.prismaService.cartItem.findMany({
            where: { userId },
        });
        return cartItems;
    }
    async updateCartItem(id, newQuantity) {
        const cartItem = await this.prismaService.cartItem.findUnique({
            where: { id },
        });
        if (!cartItem) {
            throw new common_1.NotFoundException(user_1.CART_ITEM_NOT_FOUND_MESSAGE);
        }
        const productDetails = await this.productService.findSizeQuantiy(cartItem.productId);
        const neededProductWithDetails = productDetails.filter((pd) => pd.size === cartItem.size)[0];
        if (newQuantity > neededProductWithDetails.quantity) {
            throw new common_1.ConflictException(user_1.CART_ITEM_WRONG_QUANTITY_MESSAGE);
        }
        const updateCartItem = await this.prismaService.cartItem.update({
            where: { id },
            data: {
                quantity: newQuantity,
            },
        });
        return updateCartItem;
    }
    async create(email, username, passwordHash) {
        const user = await this.prismaService.user.create({
            data: {
                email,
                username,
                password: passwordHash,
            },
        });
        return user;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        product_service_1.ProductService])
], UserService);
//# sourceMappingURL=user.service.js.map