import { OrderService } from "./order.service";
import { OrderCreateDTO } from "./order.dto";
import { OrderStatus } from "@prisma/client";
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    findAll(): Promise<{
        totalPrice: number;
        user: {
            id: string;
            username: string;
            password: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            role: import(".prisma/client").$Enums.RoleName;
        };
        orderItem: {
            id: string;
            quantity: number;
            size: number;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
            orderId: string;
            productId: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        id: string;
        orderStatus: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }[]>;
    findById(id: string): Promise<{
        orderItem: {
            id: string;
            quantity: number;
            size: number;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
            orderId: string;
            productId: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        orderStatus: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    findByUserId(userId: string): Promise<{
        orderItems: {
            product: {
                productRest: {
                    id: string;
                    name: string;
                    slug: string;
                    description: string;
                    oldPrice: import("@prisma/client/runtime/library").Decimal;
                    currentPrice: import("@prisma/client/runtime/library").Decimal;
                    createdAt: Date;
                    updatedAt: Date;
                };
                productImages: {
                    id: string;
                    imagePath: string;
                    productId: string;
                }[];
            };
            id: string;
            quantity: number;
            size: number;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
            orderId: string;
            productId: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        id: string;
        orderStatus: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }[]>;
    findByProductId(productId: string): Promise<{
        id: string;
        orderStatus: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }[]>;
    create(dto: OrderCreateDTO): Promise<{
        id: string;
        orderStatus: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    updateStatus(id: string, newOrderStatus: OrderStatus): Promise<{
        id: string;
        orderStatus: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
}
