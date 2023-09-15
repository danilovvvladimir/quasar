import { PrismaService } from "src/database/prisma.service";
import { ProductService } from "src/product/product.service";
export declare class UserService {
    private prismaService;
    private readonly productService;
    constructor(prismaService: PrismaService, productService: ProductService);
    findAll(): Promise<{
        id: string;
        username: string;
        password: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findById(id: string): Promise<{
        review: {
            id: string;
            text: string;
            rating: number;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            productId: string;
        }[];
        order: ({
            orderItem: {
                id: string;
                quantity: number;
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
        })[];
    } & {
        id: string;
        username: string;
        password: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        id: string;
        username: string;
        password: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOrders(userId: string): Promise<{
        id: string;
        orderStatus: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }[]>;
    findWishlistItems(userId: string): Promise<{
        id: string;
        userId: string;
        productId: string;
    }[]>;
    findCartItems(userId: string): Promise<{
        id: string;
        size: number;
        quantity: number;
        userId: string;
        productId: string;
    }[]>;
    updateCartItem(id: string, newQuantity: number): Promise<{
        id: string;
        size: number;
        quantity: number;
        userId: string;
        productId: string;
    }>;
    create(email: string, username: string, passwordHash: string): Promise<{
        id: string;
        username: string;
        password: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
