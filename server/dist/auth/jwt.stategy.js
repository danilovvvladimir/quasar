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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const database_module_1 = require("../database/database.module");
const userQueryCreator_service_1 = require("../queries/userQueryCreator.service");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService, userQueryCreatorService, connectionService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get("JWT_SECRET"),
        });
        this.configService = configService;
        this.userQueryCreatorService = userQueryCreatorService;
        this.connectionService = connectionService;
    }
    async validate({ user_id }) {
        const res = await this.connectionService.query(this.userQueryCreatorService.getUserByIdQuery(user_id));
        console.log(res.rows);
        return res.rows;
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(database_module_1.PG_CONNECTION)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        userQueryCreator_service_1.UserQueryCreatorService, Object])
], JwtStrategy);
//# sourceMappingURL=jwt.stategy.js.map