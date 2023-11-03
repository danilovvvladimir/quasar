import { ProductService } from "./product.service";
import { ProductCreateDTO, ProductUpdateDTO } from "./product.dto";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(searchTerm?: string, sorting?: string, currentMinPrice?: number, currentMaxPrice?: number, selectedCategories?: string, rating?: number, isDiscount?: string): Promise<any[]>;
    findById(id: string): Promise<any>;
    findMinMaxPrice(): Promise<{
        min: import("@prisma/client/runtime/library").Decimal;
        max: import("@prisma/client/runtime/library").Decimal;
    }>;
    findBySlug(slug: string): Promise<any>;
    findByCategoryId(categoryId: string): Promise<any[]>;
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
        oldPrice: import("@prisma/client/runtime/library").Decimal;
        currentPrice: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createDetails(id: string, dto: ProductUpdateDTO): Promise<{
        id: string;
        name: string;
        slug: string;
        description: string;
        oldPrice: import("@prisma/client/runtime/library").Decimal;
        currentPrice: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        slug: string;
        description: string;
        oldPrice: import("@prisma/client/runtime/library").Decimal;
        currentPrice: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
