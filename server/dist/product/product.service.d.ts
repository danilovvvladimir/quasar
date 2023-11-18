import { Prisma } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";
import { ProductCreateDTO, ProductUpdateDTO } from "./product.dto";
import { CategoryService } from "src/category/category.service";
import { AllProductsConfig } from "src/types/product";
export declare class ProductService {
    private readonly prismaService;
    private readonly categoryService;
    constructor(prismaService: PrismaService, categoryService: CategoryService);
    findMinMaxPrice(): Promise<{
        min: Prisma.Decimal;
        max: Prisma.Decimal;
    }>;
    findAll(config: AllProductsConfig): Promise<{
        products: ({
            categories: ({
                category: {
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } & {
                id: string;
                productId: string;
                categoryId: string;
            })[];
            productImages: {
                id: string;
                imagePath: string;
                productId: string;
            }[];
            productSizes: {
                id: string;
                size: number;
                quantity: number;
                productId: string;
            }[];
            reviews: {
                id: string;
                text: string;
                rating: number;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                productId: string;
            }[];
        } & {
            id: string;
            name: string;
            slug: string;
            description: string;
            oldPrice: Prisma.Decimal;
            currentPrice: Prisma.Decimal;
            createdAt: Date;
            updatedAt: Date;
        })[];
        count: number;
    }>;
    private getProductOrderBy;
    findById(id: string): Promise<{
        categories: ({
            category: {
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            productId: string;
            categoryId: string;
        })[];
        productImages: {
            id: string;
            imagePath: string;
            productId: string;
        }[];
        productSizes: {
            id: string;
            size: number;
            quantity: number;
            productId: string;
        }[];
        reviews: {
            id: string;
            text: string;
            rating: number;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            productId: string;
        }[];
    } & {
        id: string;
        name: string;
        slug: string;
        description: string;
        oldPrice: Prisma.Decimal;
        currentPrice: Prisma.Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findBySlug(slug: string): Promise<{
        categories: ({
            category: {
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            productId: string;
            categoryId: string;
        })[];
        productImages: {
            id: string;
            imagePath: string;
            productId: string;
        }[];
        productSizes: {
            id: string;
            size: number;
            quantity: number;
            productId: string;
        }[];
        reviews: {
            id: string;
            text: string;
            rating: number;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            productId: string;
        }[];
    } & {
        id: string;
        name: string;
        slug: string;
        description: string;
        oldPrice: Prisma.Decimal;
        currentPrice: Prisma.Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByCategoryId(categoryId: string): Promise<({
        categories: ({
            category: {
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            productId: string;
            categoryId: string;
        })[];
        productImages: {
            id: string;
            imagePath: string;
            productId: string;
        }[];
        productSizes: {
            id: string;
            size: number;
            quantity: number;
            productId: string;
        }[];
        reviews: {
            id: string;
            text: string;
            rating: number;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            productId: string;
        }[];
    } & {
        id: string;
        name: string;
        slug: string;
        description: string;
        oldPrice: Prisma.Decimal;
        currentPrice: Prisma.Decimal;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findSizeQuantiy(id: string): Promise<{
        id: string;
        size: number;
        quantity: number;
        productId: string;
    }[]>;
    findImages(id: string): Promise<{
        id: string;
        imagePath: string;
        productId: string;
    }[]>;
    create(dto: ProductCreateDTO): Promise<{
        id: string;
        name: string;
        slug: string;
        description: string;
        oldPrice: Prisma.Decimal;
        currentPrice: Prisma.Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
    private createProductDetails;
    private createProductImages;
    private createProductCategories;
    update(id: string, dto: ProductUpdateDTO): Promise<{
        id: string;
        name: string;
        slug: string;
        description: string;
        oldPrice: Prisma.Decimal;
        currentPrice: Prisma.Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        slug: string;
        description: string;
        oldPrice: Prisma.Decimal;
        currentPrice: Prisma.Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
    private deleteProductImages;
    private deleteProductDetails;
    private deleteProductCategories;
}
