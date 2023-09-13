import { AuthLoginDTO, AuthRefreshTokenDTO, AuthRegisterDTO } from "./auth.dto";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    register(registerDTO: AuthRegisterDTO): Promise<{
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
    login(loginDTO: AuthLoginDTO): Promise<{
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
            id: string;
            username: string;
            password: string;
        };
    }>;
    private issueTokens;
    private validateUser;
}
