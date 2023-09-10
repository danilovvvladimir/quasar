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
        user: import("../types/user").User;
    }>;
    login(loginDTO: AuthLoginDTO): Promise<{
        accessToken: string;
        refreshToken: string;
        user: import("../types/user").User;
    }>;
    getNewTokens(dto: AuthRefreshTokenDTO): Promise<{
        accessToken: string;
        refreshToken: string;
        user: import("../types/user").User;
    }>;
    private issueTokens;
    private validateUser;
}
