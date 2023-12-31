import { AuthLoginDTO, AuthRegisterDTO, RefreshTokenDTO } from "./auth.dto";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    register(registerDTO: AuthRegisterDTO): Promise<{
        user: {
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
            wishlistItems: {
                id: string;
                userId: string;
                productId: string;
            }[];
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
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    login(loginDTO: AuthLoginDTO): Promise<{
        user: {
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
            wishlistItems: {
                id: string;
                userId: string;
                productId: string;
            }[];
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
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    getNewTokens(dto: RefreshTokenDTO): Promise<{
        user: {
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
            wishlistItems: {
                id: string;
                userId: string;
                productId: string;
            }[];
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
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    private issueTokens;
    private validateUser;
}
