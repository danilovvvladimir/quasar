import { UserService } from "./user.service";
import { CartItemCreateDTO, UserUpdateDTO, WishlistItemToggleDTO } from "./user.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<({
        wishlistItems: {
            id: string;
            userId: string;
            productId: string;
        }[];
        reviews: {
            id: string;
            text: string;
            rating: number;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            productId: string;
        }[];
        cartItems: ({
            product: {
                productImages: {
                    id: string;
                    imagePath: string;
                    productId: string;
                }[];
                productSizes: {
                    id: string;
                    size: number;
                    quantity: number;
                    productId: string;
                }[];
            } & {
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
        orders: ({
            orderItems: {
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
        })[];
    } & {
        id: string;
        username: string;
        password: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        role: import(".prisma/client").$Enums.RoleName;
    })[]>;
    getStatistics(): Promise<{
        users: number;
        reviews: number;
        orders: number;
        totalIncome: number;
    }>;
    getProfile(id: string): Promise<{
        wishlistItems: {
            id: string;
            userId: string;
            productId: string;
        }[];
        reviews: {
            id: string;
            text: string;
            rating: number;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            productId: string;
        }[];
        cartItems: ({
            product: {
                productImages: {
                    id: string;
                    imagePath: string;
                    productId: string;
                }[];
                productSizes: {
                    id: string;
                    size: number;
                    quantity: number;
                    productId: string;
                }[];
            } & {
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
        orders: ({
            orderItems: {
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
        })[];
        id: string;
        username: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        role: import(".prisma/client").$Enums.RoleName;
    }>;
    findById(id: string): Promise<{
        wishlistItems: {
            id: string;
            userId: string;
            productId: string;
        }[];
        reviews: {
            id: string;
            text: string;
            rating: number;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            productId: string;
        }[];
        cartItems: ({
            product: {
                productImages: {
                    id: string;
                    imagePath: string;
                    productId: string;
                }[];
                productSizes: {
                    id: string;
                    size: number;
                    quantity: number;
                    productId: string;
                }[];
            } & {
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
        orders: ({
            orderItems: {
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
        })[];
        id: string;
        username: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        role: import(".prisma/client").$Enums.RoleName;
    }>;
    findByEmail(email: string): Promise<{
        wishlistItems: {
            id: string;
            userId: string;
            productId: string;
        }[];
        reviews: {
            id: string;
            text: string;
            rating: number;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            productId: string;
        }[];
        cartItems: ({
            product: {
                productImages: {
                    id: string;
                    imagePath: string;
                    productId: string;
                }[];
                productSizes: {
                    id: string;
                    size: number;
                    quantity: number;
                    productId: string;
                }[];
            } & {
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
        orders: ({
            orderItems: {
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
    findOrders(userId: string): Promise<{
        id: string;
        orderStatus: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }[]>;
    findWishlistItems(userId: string): Promise<({
        product: {
            reviews: {
                id: string;
                text: string;
                rating: number;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                productId: string;
            }[];
            productImages: {
                id: string;
                imagePath: string;
                productId: string;
            }[];
        } & {
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
        userId: string;
        productId: string;
    })[]>;
    findCartItems(userId: string): Promise<({
        product: {
            productImages: {
                id: string;
                imagePath: string;
                productId: string;
            }[];
            productSizes: {
                id: string;
                size: number;
                quantity: number;
                productId: string;
            }[];
        } & {
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
    toggleWishlistItem(dto: WishlistItemToggleDTO): Promise<{}>;
    deleteCartItem(id: string): Promise<{
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
    update(id: string, dto: UserUpdateDTO): Promise<{
        id: string;
        username: string;
        password: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        role: import(".prisma/client").$Enums.RoleName;
    }>;
}
