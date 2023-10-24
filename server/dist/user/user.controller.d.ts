import { UserService } from "./user.service";
import { CartItemCreateDTO } from "./user.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<{
        id: string;
        username: string;
        password: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        role: import(".prisma/client").$Enums.RoleName;
    }[]>;
    getProfile(id: string): Promise<{
        wishlistItem: {
            id: string;
            userId: string;
            productId: string;
        }[];
        review: {
            id: string;
            text: string;
            rating: number;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            productId: string;
        }[];
        cartItem: ({
            product: {
                id: string;
                name: string;
                slug: string;
                description: string;
                oldPrice: import("@prisma/client/runtime/library").Decimal;
                currentPrice: import("@prisma/client/runtime/library").Decimal;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            size: number;
            quantity: number;
            userId: string;
            productId: string;
        })[];
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
        role: import(".prisma/client").$Enums.RoleName;
    }>;
    findById(id: string): Promise<{
        wishlistItem: {
            id: string;
            userId: string;
            productId: string;
        }[];
        review: {
            id: string;
            text: string;
            rating: number;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            productId: string;
        }[];
        cartItem: ({
            product: {
                id: string;
                name: string;
                slug: string;
                description: string;
                oldPrice: import("@prisma/client/runtime/library").Decimal;
                currentPrice: import("@prisma/client/runtime/library").Decimal;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            size: number;
            quantity: number;
            userId: string;
            productId: string;
        })[];
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
        role: import(".prisma/client").$Enums.RoleName;
    }>;
    findByEmail(email: string): Promise<{
        wishlistItem: {
            id: string;
            userId: string;
            productId: string;
        }[];
        cartItem: {
            id: string;
            size: number;
            quantity: number;
            userId: string;
            productId: string;
        }[];
    } & {
        id: string;
        username: string;
        password: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        role: import(".prisma/client").$Enums.RoleName;
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
    findCartItems(userId: string): Promise<({
        product: {
            id: string;
            name: string;
            slug: string;
            description: string;
            oldPrice: import("@prisma/client/runtime/library").Decimal;
            currentPrice: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        size: number;
        quantity: number;
        userId: string;
        productId: string;
    })[]>;
    createCartItem(dto: CartItemCreateDTO): Promise<{
        id: string;
        size: number;
        quantity: number;
        userId: string;
        productId: string;
    }>;
    updateCartItemQuantity(id: string, newQuantity: number): Promise<{
        id: string;
        size: number;
        quantity: number;
        userId: string;
        productId: string;
    }>;
}
