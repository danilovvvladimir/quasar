import { AuthService } from "./auth.service";
import { AuthRegisterDTO, AuthLoginDTO, AuthRefreshTokenDTO } from "./auth.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: AuthRegisterDTO): Promise<{
        accessToken: string;
        refreshToken: string;
        user: import("../types/user").User;
    }>;
    login(dto: AuthLoginDTO): Promise<{
        accessToken: string;
        refreshToken: string;
        user: import("../types/user").User;
    }>;
    getNewTokens(dto: AuthRefreshTokenDTO): Promise<{
        accessToken: string;
        refreshToken: string;
        user: import("../types/user").User;
    }>;
}
