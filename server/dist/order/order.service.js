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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const order_1 = require("../constants/order");
const prisma_service_1 = require("../database/prisma.service");
let OrderService = class OrderService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getOrderTotalPrice(orderId) {
        const orderWithTotalPrice = await this.prismaService.orderItem.aggregate({
            where: {
                orderId: orderId,
            },
            _sum: {
                totalPrice: true,
            },
        });
        return orderWithTotalPrice._sum.totalPrice;
    }
    async findAll() {
        const orders = await this.prismaService.order.findMany({
            include: { orderItems: true, user: true },
            orderBy: { createdAt: "desc" },
        });
        const orderPromises = orders.map(async (item) => (Object.assign(Object.assign({}, item), { totalPrice: +(await this.getOrderTotalPrice(item.id)) })));
        const ordersWithTotalPrices = await Promise.all(orderPromises);
        return ordersWithTotalPrices;
    }
    async findById(id) {
        const order = await this.prismaService.order.findUnique({
            where: { id },
            include: { orderItems: true },
        });
        if (!order) {
            throw new common_1.NotFoundException(order_1.ORDER_NOT_FOUND_MESSAGE);
        }
        return order;
    }
    async findByUserId(userId) {
        const orders = await this.prismaService.order.findMany({
            where: {
                userId,
            },
            include: {
                orderItems: {
                    include: {
                        product: {
                            include: {
                                productImages: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return orders;
    }
    async findByProductId(productId) {
        const products = await this.prismaService.order.findMany({
            where: {
                orderItems: {
                    some: {
                        productId,
                    },
                },
            },
        });
        return products;
    }
    async create(dto) {
        const { orderItems, userId } = dto;
        let order;
        try {
            order = await this.prismaService.$transaction(async (prisma) => {
                const createdOrder = await prisma.order.create({
                    data: {
                        userId,
                    },
                });
                this.createOrderItems(createdOrder.id, {
                    orderItems,
                });
                this.updateOrderedItems({ orderItems });
                return createdOrder;
            });
        }
        catch (error) {
            throw new common_1.HttpException(order_1.ORDER_CREATE_ERROR_MESSAGE, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return order;
    }
    async updateOrderedItems(dto) {
        const { orderItems } = dto;
        const detailsPromises = orderItems.map((orderItem) => {
            return this.prismaService.productSize.updateMany({
                data: {
                    quantity: {
                        decrement: 1,
                    },
                },
                where: {
                    productId: orderItem.productId,
                    AND: {
                        size: orderItem.size,
                    },
                },
            });
        });
        await Promise.all(detailsPromises);
        return detailsPromises;
    }
    async createOrderItems(id, dto) {
        const { orderItems } = dto;
        const detailsPromises = orderItems.map((orderItem) => {
            return this.prismaService.orderItem.create({
                data: {
                    size: orderItem.size,
                    quantity: orderItem.quantity,
                    totalPrice: orderItem.totalPrice,
                    productId: orderItem.productId,
                    orderId: id,
                },
            });
        });
        await Promise.all(detailsPromises);
        return detailsPromises;
    }
    async updateStatus(dto) {
        const { newOrderStatus, id } = dto;
        await this.findById(id);
        const order = await this.prismaService.order.update({
            where: { id },
            data: {
                orderStatus: newOrderStatus,
            },
        });
        return order;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
//# sourceMappingURL=order.service.js.map