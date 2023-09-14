import { ProductSize } from "@prisma/client";
export declare class ProductCreateDTO {
    name: string;
    slug: string;
    description: string;
    price: number;
    details: Omit<ProductSize, "id" | "productId">[];
    imagePaths: string[];
    categoryIds: string[];
}
export declare class ProductDetailsCreateDTO {
    details: Omit<ProductSize, "id" | "productId">[];
}
export declare class ProductImagesCreateDTO {
    imagePaths: string[];
}
export declare class ProductCategoryCreateDTO {
    categoryIds: string[];
}
export declare class ProductUpdateDTO extends ProductCreateDTO {
    discountPercentage: number;
}
