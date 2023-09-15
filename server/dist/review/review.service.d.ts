import { PrismaService } from "src/database/prisma.service";
import { ProductService } from "src/product/product.service";
import { UserService } from "src/user/user.service";
import { ReviewCreateDTO } from "./review.dto";
export declare class ReviewService {
    private readonly userService;
    private readonly productService;
    private readonly prismaService;
    constructor(userService: UserService, productService: ProductService, prismaService: PrismaService);
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
    findByProductId(productId: string): Promise<{
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
    update(id: string, userId: string, dto: ReviewCreateDTO): Promise<{
        id: string;
        text: string;
        rating: number;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        productId: string;
    }>;
}
