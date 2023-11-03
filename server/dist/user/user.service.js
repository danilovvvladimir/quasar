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
                review: true,
                cartItem: {
                    include: {
                        product: {
                            include: {
                                productImage: true,
                                productSize: true,
                            },
                        },
                    },
                },
                wishlistItem: true,
                order: {
                    include: {
                        orderItem: true,
                    },
                },
            },
        });
        const usersWithFormattedFields = users.map((user) => {
            const { password, cartItem, review, order, wishlistItem, createdAt, updatedAt } = user, rest = __rest(user, ["password", "cartItem", "review", "order", "wishlistItem", "createdAt", "updatedAt"]);
            const userWithRenamedFields = Object.assign(Object.assign({}, rest), { createdAt: createdAt, updatedAt: updatedAt, cartItems: cartItem, reviews: review, orders: order, wishlistItems: wishlistItem });
            console.log("userWithRenamedFields", userWithRenamedFields);
            return userWithRenamedFields;
        });
        return usersWithFormattedFields;
    }
    async findById(id) {
        const user = await this.prismaService.user.findUnique({
            where: { id },
            include: {
                review: true,
                cartItem: {
                    include: {
                        product: {
                            include: {
                                productImage: true,
                                productSize: true,
                            },
                        },
                    },
                },
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
        const { password, cartItem, review, order, wishlistItem } = user, rest = __rest(user, ["password", "cartItem", "review", "order", "wishlistItem"]);
        const userWithRenamedFields = Object.assign(Object.assign({}, rest), { cartItems: cartItem, reviews: review, orders: order, wishlistItems: wishlistItem });
        return userWithRenamedFields;
    }
    async findByEmail(email) {
        const user = await this.prismaService.user.findUnique({
            where: { email },
            include: {
                review: true,
                cartItem: {
                    include: {
                        product: {
                            include: {
                                productImage: true,
                                productSize: true,
                            },
                        },
                    },
                },
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
        const { cartItem, review, order, wishlistItem } = user, rest = __rest(user, ["cartItem", "review", "order", "wishlistItem"]);
        const userWithRenamedFields = Object.assign(Object.assign({}, rest), { cartItems: cartItem, reviews: review, orders: order, wishlistItems: wishlistItem });
        return userWithRenamedFields;
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
                        productImage: true,
                        review: true,
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
                        productImage: true,
                        productSize: true,
                    },
                },
            },
        });
        const formattedCartItems = cartItems.map((cartItem) => {
            const { product } = cartItem, rest = __rest(cartItem, ["product"]);
            const { productImage, productSize } = product, productRest = __rest(product, ["productImage", "productSize"]);
            return Object.assign(Object.assign({}, rest), { product: Object.assign(Object.assign({}, productRest), { productImages: productImage, productSizes: productSize }) });
        });
        return formattedCartItems;
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
                review: true,
                cartItem: {
                    include: {
                        product: {
                            include: {
                                productImage: true,
                                productSize: true,
                            },
                        },
                    },
                },
                wishlistItem: true,
                order: {
                    include: {
                        orderItem: true,
                    },
                },
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