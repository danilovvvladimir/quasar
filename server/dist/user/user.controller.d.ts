import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<import("../types/user").User[]>;
    findById(id: number): Promise<import("../types/user").User>;
    findByEmail(email: string): Promise<import("../types/user").User>;
    findOrders(userId: number): Promise<import("../types/user").User[]>;
    findWishlistItems(userId: number): Promise<import("../types/user").User[]>;
    findCartItems(userId: number): Promise<import("../types/user").User[]>;
}
