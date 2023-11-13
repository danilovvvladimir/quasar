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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const review_1 = require("../constants/review");
const prisma_service_1 = require("../database/prisma.service");
const product_service_1 = require("../product/product.service");
const user_service_1 = require("../user/user.service");
const client_1 = require("@prisma/client");
let ReviewService = class ReviewService {
    constructor(userService, productService, prismaService) {
        this.userService = userService;
        this.productService = productService;
        this.prismaService = prismaService;
    }
    async findAll() {
        const reviews = await this.prismaService.review.findMany({
            include: {
                product: true,
                user: true,
            },
        });
        return reviews;
    }
    async findById(id) {
        const review = await this.prismaService.review.findUnique({
            where: { id },
        });
        if (!review) {
            throw new common_1.NotFoundException(review_1.REVIEW_NOT_FOUND_MESSAGE);
        }
        return review;
    }
    async findByProductId(productId) {
        await this.productService.findById(productId);
        const reviews = await this.prismaService.review.findMany({
            where: {
                productId,
            },
            include: {
                user: true,
            },
        });
        return reviews;
    }
    async findByUserId(userId) {
        await this.userService.findById(userId);
        const reviews = await this.prismaService.review.findMany({
            where: {
                userId,
            },
            include: {
                product: {
                    include: { productImages: true },
                },
            },
        });
        return reviews;
    }
    async create(dto) {
        const { productId, rating, text, userId } = dto;
        await this.productService.findById(productId);
        const { reviews: userReviews, orders: userOrders } = await this.userService.findById(userId);
        const userOrderItemsWIthProduct = await this.prismaService.orderItem.findMany({
            where: {
                AND: [
                    {
                        order: {
                            userId,
                        },
                    },
                    { productId },
                ],
            },
        });
        if (!userOrderItemsWIthProduct.length) {
            throw new common_1.ConflictException(review_1.REVIEW_CREATE_NO_ORDER_MESSAGE);
        }
        if (userReviews.filter((r) => r.productId === productId).length) {
            throw new common_1.ConflictException(review_1.REVIEW_CREATE_DUBLICATE_MESSAGE);
        }
        const review = await this.prismaService.review.create({
            data: {
                rating,
                text,
                productId,
                userId,
            },
        });
        return review;
    }
    async update(id, userId, userRole, dto) {
        const { rating, text } = dto;
        const review = await this.findById(id);
        if (review.userId !== userId &&
            !userRole.includes(client_1.$Enums.RoleName.ADMIN) &&
            !userRole.includes(client_1.$Enums.RoleName.SUPERADMIN)) {
            throw new common_1.ForbiddenException(review_1.REVIEW_UPDATE_OTHER_USER_MESSAGE);
        }
        const updatedReview = await this.prismaService.review.update({
            where: { id },
            data: {
                rating,
                text,
            },
        });
        return updatedReview;
    }
    async delete(id, userId, userRole) {
        const review = await this.findById(id);
        if (review.userId !== userId &&
            !userRole.includes(client_1.$Enums.RoleName.ADMIN) &&
            !userRole.includes(client_1.$Enums.RoleName.SUPERADMIN)) {
            throw new common_1.ForbiddenException(review_1.REVIEW_UPDATE_OTHER_USER_MESSAGE);
        }
        await this.prismaService.review.delete({ where: { id } });
        return review;
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        product_service_1.ProductService,
        prisma_service_1.PrismaService])
], ReviewService);
//# sourceMappingURL=review.service.js.map