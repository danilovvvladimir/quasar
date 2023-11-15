export declare class UserUpdateDTO {
    email: string;
    password: string;
    username: string;
}
export declare class UserToggleAdminDTO {
    userId: string;
    isAdmin: boolean;
}
export declare class CartItemCreateDTO {
    size: number;
    userId: string;
    productId: string;
}
export declare class WishlistItemToggleDTO {
    userId: string;
    productId: string;
}
