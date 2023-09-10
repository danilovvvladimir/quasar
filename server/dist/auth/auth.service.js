"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const argon2_1 = require("argon2");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const auth_1 = require("../constants/auth");
let AuthService = class AuthService {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async register(registerDTO) {
        try {
            const isUserAlreadyExist = await this.userService.findByEmail(registerDTO.email);
            if (isUserAlreadyExist) {
                throw new common_1.BadRequestException(auth_1.USER_ALREADY_EXISTS_MESSAGE);
            }
        }
        catch (error) {
            await this.userService.create(registerDTO.email, registerDTO.username, await (0, argon2_1.hash)(registerDTO.password));
            const user = await this.userService.findByEmail(registerDTO.email);
            const tokens = await this.issueTokens(user.user_id);
            return Object.assign({ user }, tokens);
        }
    }
    async login(loginDTO) {
        const user = await this.validateUser(loginDTO);
        const tokens = await this.issueTokens(user.user_id);
        return Object.assign({ user: user }, tokens);
    }
    async getNewTokens(dto) {
        const refreshToken = dto.refreshToken;
        const result = await this.jwtService.verifyAsync(refreshToken);
        if (!result) {
            throw new common_1.UnauthorizedException(auth_1.INVALID_REFRESH_TOKEN_MESSAGE);
        }
        const user = await this.userService.findById(result.id);
        const tokens = await this.issueTokens(user.user_id);
        return Object.assign({ user }, tokens);
    }
    async issueTokens(userId) {
        const data = { id: userId };
        const accessToken = this.jwtService.sign(data, {
            expiresIn: auth_1.ACCESS_TOKEN_EXPIRATION_TIME,
        });
        const refreshToken = this.jwtService.sign(data, {
            expiresIn: auth_1.REFRESH_TOKEN_EXPIRATION_TIME,
        });
        return { accessToken, refreshToken };
    }
    async validateUser(loginDto) {
        const user = await this.userService.findByEmail(loginDto.email);
        const isValidPassword = await (0, argon2_1.verify)(user.password, loginDto.password);
        if (!isValidPassword) {
            throw new common_1.NotFoundException(auth_1.INVALID_PASSWORD_MESSAGE);
        }
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map