import { ProductService } from "./product.service";
import { ProductCreateDTO, ProductUpdateDTO } from "./product.dto";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(): Promise<{
        id: string;
        name: string;
        slug: string;
        description: string;
        price: import("@prisma/client/runtime/library").Decimal;
        discountPercentage: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        name: string;
        slug: string;
        description: string;
        price: import("@prisma/client/runtime/library").Decimal;
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
        discountPercentage: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findDetails(id: string): Promise<{
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
        discountPercentage: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createDetails(id: string, dto: ProductUpdateDTO): Promise<{
        id: string;
        name: string;
        slug: string;
        description: string;
        price: import("@prisma/client/runtime/library").Decimal;
        discountPercentage: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createImages(id: string): Promise<{
        id: string;
        name: string;
        slug: string;
        description: string;
        price: import("@prisma/client/runtime/library").Decimal;
        discountPercentage: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
