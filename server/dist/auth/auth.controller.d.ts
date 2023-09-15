import { AuthService } from "./auth.service";
import { AuthRegisterDTO, AuthLoginDTO, AuthRefreshTokenDTO } from "./auth.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: AuthRegisterDTO): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            username: string;
            password: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    login(dto: AuthLoginDTO): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            username: string;
            password: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    getNewTokens(dto: AuthRefreshTokenDTO): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
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
        };
    }>;
}
