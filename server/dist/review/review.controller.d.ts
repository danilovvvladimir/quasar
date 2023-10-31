import { ReviewService } from "./review.service";
import { ReviewCreateDTO, ReviewUpdateDTO } from "./review.dto";
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    findAll(): Promise<({
        user: {
            id: string;
            username: string;
            password: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            role: import(".prisma/client").$Enums.RoleName;
        };
        product: {
            id: string;
            name: string;
            slug: string;
            description: string;
            oldPrice: import("@prisma/client/runtime/library").Decimal;
            currentPrice: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        text: string;
        rating: number;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        productId: string;
    })[]>;
    findById(id: string): Promise<{
        id: string;
        orderStatus: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    findByProductId(productId: string): Promise<({
        user: {
            id: string;
            username: string;
            password: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            role: import(".prisma/client").$Enums.RoleName;
        };
    } & {
        id: string;
        text: string;
        rating: number;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        productId: string;
    })[]>;
    findByUserId(userId: string): Promise<({
        product: {
            productImage: {
                id: string;
                imagePath: string;
                productId: string;
            }[];
        } & {
            id: string;
            name: string;
            slug: string;
            description: string;
            oldPrice: import("@prisma/client/runtime/library").Decimal;
            currentPrice: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        text: string;
        rating: number;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        productId: string;
    })[]>;
    create(dto: ReviewCreateDTO): Promise<{
        id: string;
        text: string;
        rating: number;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        productId: string;
    }>;
    update(id: string, userId: string, userRole: string, dto: ReviewUpdateDTO): Promise<{
        id: string;
        text: string;
        rating: number;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        productId: string;
    }>;
    delete(id: string, userId: string, userRole: string): Promise<{
        id: string;
        orderStatus: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
}
