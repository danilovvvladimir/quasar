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
let UserService = class UserService {
    constructor(prismaService) {
        this.prismaService = prismaService;
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
        const user = await this.prismaService.user.findUnique({ where: { email } });
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
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map