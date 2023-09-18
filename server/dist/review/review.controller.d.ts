import { ReviewService } from "./review.service";
import { ReviewCreateDTO, ReviewUpdateDTO } from "./review.dto";
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    findAll(): Promise<{
        id: string;
        text: string;
        rating: number;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        productId: string;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        orderStatus: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    findByProductIdId(productId: string): Promise<{
        id: string;
        text: string;
        rating: number;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        productId: string;
    }[]>;
    findByUserId(userId: string): Promise<{
        id: string;
        text: string;
        rating: number;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        productId: string;
    }[]>;
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
