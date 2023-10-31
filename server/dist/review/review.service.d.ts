import { PrismaService } from "src/database/prisma.service";
import { ProductService } from "src/product/product.service";
import { UserService } from "src/user/user.service";
import { ReviewCreateDTO, ReviewUpdateDTO } from "./review.dto";
import { $Enums } from "@prisma/client";
export declare class ReviewService {
    private readonly userService;
    private readonly productService;
    private readonly prismaService;
    constructor(userService: UserService, productService: ProductService, prismaService: PrismaService);
    findAll(): Promise<({
        user: {
            id: string;
            username: string;
            password: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            role: $Enums.RoleName;
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
        orderStatus: $Enums.OrderStatus;
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
            role: $Enums.RoleName;
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
        orderStatus: $Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
}
