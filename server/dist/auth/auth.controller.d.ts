import { AuthService } from "./auth.service";
import { AuthRegisterDTO, AuthLoginDTO, RefreshTokenDTO } from "./auth.dto";
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
            role: import(".prisma/client").$Enums.RoleName;
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
            role: import(".prisma/client").$Enums.RoleName;
        };
    }>;
    getNewTokens(refreshToken: RefreshTokenDTO): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
