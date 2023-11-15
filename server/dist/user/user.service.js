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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_1 = require("../constants/user");
const prisma_service_1 = require("../database/prisma.service");
const product_service_1 = require("../product/product.service");
const auth_1 = require("../constants/auth");
const argon2_1 = require("argon2");
let UserService = class UserService {
    constructor(prismaService, productService) {
        this.prismaService = prismaService;
        this.productService = productService;
    }
    async getStatistics() {
        const allUsers = await this.findAll();
        const allReviews = await this.prismaService.review.findMany();
        const allOrders = await this.prismaService.order.findMany();
        const totalIncome = await this.prismaService.orderItem.aggregate({
            _sum: {
                totalPrice: true,
            },
        });
        return {
            users: allUsers.length,
            reviews: allReviews.length,
            orders: allOrders.length,
            totalIncome: +totalIncome._sum.totalPrice,
        };
    }
    async findAll() {
        const users = await this.prismaService.user.findMany({
            include: {
                reviews: true,
                cartItems: {
                    include: {
                        product: {
                            include: {
                                productImages: true,
                                productSizes: true,
                            },
                        },
                    },
                },
                wishlistItems: true,
                orders: {
                    include: {
                        orderItems: true,
                    },
                },
            },
        });
        return users;
    }
    async findById(id) {
        const user = await this.prismaService.user.findUnique({
            where: { id },
            include: {
                reviews: true,
                cartItems: {
                    include: {
                        product: {
                            include: {
                                productImages: true,
                                productSizes: true,
                            },
                        },
                    },
                },
                wishlistItems: true,
                orders: {
                    include: {
                        orderItems: true,
                    },
                },
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(user_1.USER_NOT_FOUND_MESSAGE);
        }
        const { password } = user, rest = __rest(user, ["password"]);
        return rest;
    }
    async findByEmail(email) {
        const user = await this.prismaService.user.findUnique({
            where: { email },
            include: {
                reviews: true,
                cartItems: {
                    include: {
                        product: {
                            include: {
                                productImages: true,
                                productSizes: true,
                            },
                        },
                    },
                },
                wishlistItems: true,
                orders: {
                    include: {
                        orderItems: true,
                    },
                },
            },
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
            include: {
                product: {
                    include: {
                        productImages: true,
                        reviews: true,
                    },
                },
            },
        });
        return wishlistItems;
    }
    async toggleWishlistItems(dto) {
        const { productId, userId } = dto;
        await this.findById(userId);
        const wishlistItem = await this.prismaService.wishlistItem.findFirst({
            where: { userId, productId },
        });
        let response = {};
        if (wishlistItem) {
            await this.prismaService.wishlistItem.delete({
                where: {
                    id: wishlistItem.id,
                },
            });
            response = { mode: "deleted" };
        }
        else {
            await this.prismaService.wishlistItem.create({
                data: {
                    productId,
                    userId,
                },
            });
            response = { mode: "created" };
        }
        return response;
    }
    async createCartItem(dto) {
        const { productId, size, userId } = dto;
        const cartItem = await this.prismaService.cartItem.create({
            data: {
                quantity: 1,
                size,
                productId,
                userId,
            },
        });
        return cartItem;
    }
    async deleteCartItem(cartItemId) {
        const deletedItem = await this.prismaService.cartItem.delete({
            where: {
                id: cartItemId,
            },
        });
        return deletedItem;
    }
    async findCartItems(userId) {
        await this.findById(userId);
        const cartItems = await this.prismaService.cartItem.findMany({
            where: { userId },
            include: {
                product: {
                    include: {
                        productImages: true,
                        productSizes: true,
                    },
                },
            },
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
            include: {
                reviews: true,
                cartItems: {
                    include: {
                        product: {
                            include: {
                                productImages: true,
                                productSizes: true,
                            },
                        },
                    },
                },
                wishlistItems: true,
                orders: {
                    include: {
                        orderItems: true,
                    },
                },
            },
        });
        return user;
    }
    async update(dto, id) {
        const { email, password, username } = dto;
        const userWithSameEmail = await this.prismaService.user.findUnique({
            where: {
                email,
            },
        });
        if (userWithSameEmail && userWithSameEmail.id !== id) {
            throw new common_1.BadRequestException(auth_1.USER_ALREADY_EXISTS_MESSAGE);
        }
        const updatedUser = await this.prismaService.user.update({
            where: {
                id: id,
            },
            data: password
                ? {
                    email,
                    username,
                    password: await (0, argon2_1.hash)(password),
                }
                : {
                    email,
                    username,
                },
        });
        return updatedUser;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        product_service_1.ProductService])
], UserService);
//# sourceMappingURL=user.service.js.map