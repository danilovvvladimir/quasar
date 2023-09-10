export declare class UserQueryCreatorService {
    getAllUsersQuery(): string;
    getUserByIdQuery(id: number): string;
    getUserByEmailQuery(email: string): string;
    getUserOrdersQuery(id: number): string;
    getUserWishlistItemsQuery(id: number): string;
    getUserCartItemsQuery(id: number): string;
    getUserCreateQuery(email: string, username: string, passwordHash: string): string;
    private getInnerRoles;
}
