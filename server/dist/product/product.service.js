"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const product_1 = require("../constants/product");
const prisma_service_1 = require("../database/prisma.service");
const category_service_1 = require("../category/category.service");
let ProductService = class ProductService {
    constructor(prismaService, categoryService) {
        this.prismaService = prismaService;
        this.categoryService = categoryService;
    }
    async findMinMaxPrice() {
        const minPriceProduct = await this.prismaService.product.findFirst({
            orderBy: {
                currentPrice: "asc",
            },
        });
        const maxPriceProduct = await this.prismaService.product.findFirst({
            orderBy: {
                currentPrice: "desc",
            },
        });
        return {
            min: minPriceProduct.currentPrice,
            max: maxPriceProduct.currentPrice,
        };
    }
    async findAll(config) {
        const { currentMaxPrice, currentMinPrice, isDiscount, rating, selectedCategories, searchTerm, sorting, skip, take, } = config;
        let allProductsLength = 0;
        try {
            const allProductsLengthResult = await this.prismaService.$queryRaw `
      SELECT COUNT(*)::INTEGER as "count"
      FROM "Product" P
      ${selectedCategories && selectedCategories.length > 0
                ? client_1.Prisma.sql `
            JOIN (
        SELECT DISTINCT PC.product_id
        FROM "ProductCategory" PC
        JOIN "Category" C ON PC.category_id = C.id
        WHERE C.name = ANY(${selectedCategories})
      ) AS Subquery ON P.id = Subquery.product_id
    `
                : client_1.Prisma.empty}
      WHERE
        1=1
        ${searchTerm
                ? client_1.Prisma.sql `AND P.name ILIKE ${`%${searchTerm}%`}`
                : client_1.Prisma.empty}
        ${currentMinPrice && currentMaxPrice
                ? client_1.Prisma.sql `AND P.current_price BETWEEN ${+currentMinPrice} AND ${+currentMaxPrice}`
                : client_1.Prisma.empty}
        ${isDiscount ? client_1.Prisma.sql `AND P.old_price > 0` : client_1.Prisma.empty}
      `;
            allProductsLength = allProductsLengthResult[0].count;
        }
        catch (error) {
            console.error("Error executing raw query count", error);
        }
        let result = [];
        try {
            result = await this.prismaService.$queryRaw `
      SELECT
        P.*,
        P.current_price as "currentPrice",
        P.old_price as "oldPrice",
        COALESCE(AVG(R.rating), 0) AS "averageRating",
        JSON_AGG(PI.*) AS "productImages",
        CAST(COALESCE(reviews_count, 0) AS INTEGER) AS "reviewsCount"
      FROM
        "Product" P
        LEFT JOIN "Review" R ON P.id = R.product_id
        LEFT JOIN "ProductImage" PI ON P.id = PI.product_id
        ${selectedCategories && selectedCategories.length > 0
                ? client_1.Prisma.sql `
            JOIN (
        SELECT DISTINCT PC.product_id
        FROM "ProductCategory" PC
        JOIN "Category" C ON PC.category_id = C.id
        WHERE C.name = ANY(${selectedCategories})
      ) AS Subquery ON P.id = Subquery.product_id
    `
                : client_1.Prisma.empty}
        LEFT JOIN (
        SELECT product_id, COUNT(*) AS reviews_count
        FROM "Review"
        GROUP BY product_id
        ) AS ReviewsCount ON P.id = ReviewsCount.product_id
      WHERE
        1=1
        ${searchTerm
                ? client_1.Prisma.sql `AND P.name ILIKE ${`%${searchTerm}%`}`
                : client_1.Prisma.empty}
        ${currentMinPrice && currentMaxPrice
                ? client_1.Prisma.sql `AND P.current_price BETWEEN ${+currentMinPrice} AND ${+currentMaxPrice}`
                : client_1.Prisma.empty}
        ${isDiscount ? client_1.Prisma.sql `AND P.old_price > 0` : client_1.Prisma.empty}
      GROUP BY
      P.id, ReviewsCount.reviews_count
      HAVING
        ${rating >= 1
                ? client_1.Prisma.sql `AVG(R.rating) >= ${+rating}`
                : client_1.Prisma.sql `1=1`}
      ORDER BY  
        ${sorting === "by-rating"
                ? client_1.Prisma.sql `"averageRating" DESC`
                : sorting === "price-asc"
                    ? client_1.Prisma.sql `current_price ASC`
                    : sorting === "price-desc"
                        ? client_1.Prisma.sql `current_price DESC`
                        : sorting === "date-asc"
                            ? client_1.Prisma.sql `P.created_at ASC`
                            : sorting === "date-desc"
                                ? client_1.Prisma.sql `P.created_at DESC`
                                : client_1.Prisma.sql `P.id ASC`}
      LIMIT ${take ? +take : allProductsLength} OFFSET ${skip ? +skip : 0}
      `;
        }
        catch (error) {
            console.error("Error executing raw query:", error);
        }
        return { products: result, count: allProductsLength };
    }
    async findById(id) {
        const product = await this.prismaService.product.findUnique({
            where: { id },
            include: {
                productImages: true,
                productSizes: true,
                reviews: true,
                categories: {
                    include: {
                        category: true,
                    },
                },
            },
        });
        if (!product) {
            throw new common_1.NotFoundException(product_1.PRODUCT_NOT_FOUND_MESSAGE);
        }
        return product;
    }
    async findBySlug(slug) {
        const product = await this.prismaService.product.findUnique({
            where: { slug },
            include: {
                productImages: true,
                productSizes: true,
                reviews: true,
                categories: {
                    include: {
                        category: true,
                    },
                },
            },
        });
        if (!product) {
            throw new common_1.NotFoundException(product_1.PRODUCT_NOT_FOUND_MESSAGE);
        }
        return product;
    }
    async findByCategoryId(categoryId) {
        await this.categoryService.findById(categoryId);
        const products = await this.prismaService.product.findMany({
            include: {
                productImages: true,
                productSizes: true,
                reviews: true,
                categories: {
                    include: {
                        category: true,
                    },
                },
            },
            where: {
                categories: {
                    some: {
                        categoryId,
                    },
                },
            },
        });
        return products;
    }
    async findSizeQuantiy(id) {
        await this.findById(id);
        const details = await this.prismaService.productSize.findMany({
            where: {
                productId: id,
            },
        });
        return details;
    }
    async findImages(id) {
        await this.findById(id);
        const images = await this.prismaService.productImage.findMany({
            where: {
                productId: id,
            },
        });
        return images;
    }
    async create(dto) {
        const { description, details, imagePaths, categoryIds, name, currentPrice, slug, oldPrice, } = dto;
        let product;
        try {
            product = await this.prismaService.$transaction(async (prisma) => {
                const createdProduct = await prisma.product.create({
                    data: {
                        name,
                        slug,
                        description,
                        currentPrice,
                        oldPrice,
                    },
                });
                this.createProductDetails(createdProduct.id, {
                    details,
                });
                this.createProductImages(createdProduct.id, {
                    imagePaths,
                });
                this.createProductCategories(createdProduct.id, { categoryIds });
                return createdProduct;
            });
        }
        catch (error) {
            const err = error;
            console.log(err.message);
            throw new common_1.HttpException(product_1.PRODUCT_CREATE_ERROR_MESSAGE, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return product;
    }
    async createProductDetails(id, dto) {
        const { details } = dto;
        const detailsPromises = details.map((detail) => this.prismaService.productSize.create({
            data: {
                productId: id,
                size: detail.size,
                quantity: detail.quantity,
            },
        }));
        await Promise.all(detailsPromises);
        return detailsPromises;
    }
    async createProductImages(id, dto) {
        const { imagePaths } = dto;
        const imagesPromises = imagePaths.map((imagePath) => this.prismaService.productImage.create({
            data: {
                productId: id,
                imagePath,
            },
        }));
        await Promise.all(imagesPromises);
        return imagesPromises;
    }
    async createProductCategories(id, dto) {
        const { categoryIds } = dto;
        await categoryIds.map((categoryId) => this.categoryService.findById(categoryId));
        const productCategoriesPromises = categoryIds.map((categoryId) => this.prismaService.productCategory.create({
            data: {
                productId: id,
                categoryId,
            },
        }));
        await Promise.all(productCategoriesPromises);
        return productCategoriesPromises;
    }
    async update(id, dto) {
        const { categoryIds, details, imagePaths, description, name, currentPrice, oldPrice, slug, } = dto;
        await this.findById(id);
        let product;
        try {
            product = await this.prismaService.$transaction(async (prisma) => {
                this.deleteProductCategories(id);
                this.deleteProductImages(id);
                this.deleteProductDetails(id);
                const updatedProduct = await prisma.product.update({
                    where: { id },
                    data: {
                        name,
                        slug,
                        description,
                        currentPrice,
                        oldPrice,
                    },
                });
                this.createProductDetails(id, { details });
                this.createProductImages(id, { imagePaths });
                this.createProductCategories(id, { categoryIds });
                return updatedProduct;
            });
        }
        catch (error) {
            throw new common_1.HttpException(product_1.PRODUCT_UPDATE_ERROR_MESSAGE, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return product;
    }
    async delete(id) {
        await this.findById(id);
        let product;
        try {
            product = await this.prismaService.$transaction(async (prisma) => {
                await this.deleteProductCategories(id);
                await this.deleteProductImages(id);
                await this.deleteProductDetails(id);
                const deletedProduct = await prisma.product.delete({
                    where: { id },
                });
                return deletedProduct;
            });
        }
        catch (error) {
            throw new common_1.HttpException(product_1.PRODUCT_DELETE_ERROR_MESSAGE, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return product;
    }
    async deleteProductImages(id) {
        await this.prismaService.productImage.deleteMany({
            where: { productId: id },
        });
        return { message: "success" };
    }
    async deleteProductDetails(id) {
        await this.prismaService.productSize.deleteMany({
            where: { productId: id },
        });
        return { message: "success" };
    }
    async deleteProductCategories(id) {
        await this.prismaService.productCategory.deleteMany({
            where: { productId: id },
        });
        return { message: "success" };
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        category_service_1.CategoryService])
], ProductService);
//# sourceMappingURL=product.service.js.map