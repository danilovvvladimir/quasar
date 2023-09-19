import { PrismaService } from "src/database/prisma.service";
import { ProductCreateDTO, ProductUpdateDTO } from "./product.dto";
import { CategoryService } from "src/category/category.service";
export declare class ProductService {
    private readonly prismaService;
    private readonly categoryService;
    constructor(prismaService: PrismaService, categoryService: CategoryService);
    findAll(): Promise<{
        id: string;
        name: string;
        slug: string;
        description: string;
        price: import("@prisma/client/runtime/library").Decimal;
        isVisible: boolean;
        discountPercentage: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findById(id: string): Promise<{
        productImage: {
            id: string;
            imagePath: string;
            productId: string;
        }[];
        productSize: {
            id: string;
            size: number;
            quantity: number;
            productId: string;
        }[];
    } & {
        id: string;
        name: string;
        slug: string;
        description: string;
        price: import("@prisma/client/runtime/library").Decimal;
        isVisible: boolean;
        discountPercentage: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findBySlug(slug: string): Promise<{
        id: string;
        name: string;
        slug: string;
        description: string;
        price: import("@prisma/client/runtime/library").Decimal;
        isVisible: boolean;
        discountPercentage: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByCategoryId(categoryId: string): Promise<{
        id: string;
        name: string;
        slug: string;
        description: string;
        price: import("@prisma/client/runtime/library").Decimal;
        isVisible: boolean;
        discountPercentage: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
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
        price: import("@prisma/client/runtime/library").Decimal;
        isVisible: boolean;
        discountPercentage: number;
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
        price: import("@prisma/client/runtime/library").Decimal;
        isVisible: boolean;
        discountPercentage: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        slug: string;
        description: string;
        price: import("@prisma/client/runtime/library").Decimal;
        isVisible: boolean;
        discountPercentage: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    private deleteProductImages;
    private deleteProductDetails;
    private deleteProductCategories;
}
