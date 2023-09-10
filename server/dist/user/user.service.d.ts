import { Pool } from "pg";
import { UserQueryCreatorService } from "src/queries/userQueryCreator.service";
import { User } from "src/types/user";
export declare class UserService {
    private connectionService;
    private readonly userQueryCreatorService;
    constructor(connectionService: Pool, userQueryCreatorService: UserQueryCreatorService);
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findOrders(userId: number): Promise<User[]>;
    findWishlistItems(userId: number): Promise<User[]>;
    findCartItems(userId: number): Promise<User[]>;
    create(email: string, username: string, passwordHash: string): Promise<{
        message: string;
    }>;
}
