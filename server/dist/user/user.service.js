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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const user_1 = require("../constants/user");
const database_module_1 = require("../database/database.module");
const userQueryCreator_service_1 = require("../queries/userQueryCreator.service");
let UserService = class UserService {
    constructor(connectionService, userQueryCreatorService) {
        this.connectionService = connectionService;
        this.userQueryCreatorService = userQueryCreatorService;
    }
    async findAll() {
        const response = await this.connectionService.query(this.userQueryCreatorService.getAllUsersQuery());
        return response.rows;
    }
    async findById(id) {
        const response = await this.connectionService.query(this.userQueryCreatorService.getUserByIdQuery(id));
        if (!response.rowCount) {
            throw new common_1.NotFoundException(user_1.USER_NOT_FOUND_MESSAGE);
        }
        return response.rows[0];
    }
    async findByEmail(email) {
        const response = await this.connectionService.query(this.userQueryCreatorService.getUserByEmailQuery(email));
        if (!response.rowCount) {
            throw new common_1.NotFoundException(user_1.USER_NOT_FOUND_MESSAGE);
        }
        return response.rows[0];
    }
    async findOrders(userId) {
        const user = await this.findById(userId);
        const response = await this.connectionService.query(this.userQueryCreatorService.getUserOrdersQuery(userId));
        return response.rows;
    }
    async findWishlistItems(userId) {
        const user = await this.findById(userId);
        const response = await this.connectionService.query(this.userQueryCreatorService.getUserWishlistItemsQuery(userId));
        return response.rows;
    }
    async findCartItems(userId) {
        const user = await this.findById(userId);
        const response = await this.connectionService.query(this.userQueryCreatorService.getUserCartItemsQuery(userId));
        return response.rows;
    }
    async create(email, username, passwordHash) {
        await this.connectionService.query(this.userQueryCreatorService.getUserCreateQuery(email, username, passwordHash));
        return { message: user_1.USER_CREATE_MESSAGE };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_module_1.PG_CONNECTION)),
    __metadata("design:paramtypes", [pg_1.Pool,
        userQueryCreator_service_1.UserQueryCreatorService])
], UserService);
//# sourceMappingURL=user.service.js.map