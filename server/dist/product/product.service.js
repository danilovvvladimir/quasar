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
const product_1 = require("../constants/product");
const prisma_service_1 = require("../database/prisma.service");
const category_service_1 = require("../category/category.service");
let ProductService = class ProductService {
    constructor(prismaService, categoryService) {
        this.prismaService = prismaService;
        this.categoryService = categoryService;
    }
    async findAll() {
        const products = await this.prismaService.product.findMany({
            include: { productImage: true },
        });
        return products;
    }
    async findById(id) {
        const product = await this.prismaService.product.findUnique({
            where: { id },
            include: {
                productImage: true,
                productSize: true,
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
        });
        if (!product) {
            throw new common_1.NotFoundException(product_1.PRODUCT_NOT_FOUND_MESSAGE);
        }
        return product;
    }
    async findByCategoryId(categoryId) {
        await this.categoryService.findById(categoryId);
        const products = await this.prismaService.product.findMany({
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
        const { description, details, imagePaths, categoryIds, name, currentPrice, slug, } = dto;
        let product = undefined;
        try {
            product = await this.prismaService.$transaction(async (prisma) => {
                const createdProduct = await prisma.product.create({
                    data: {
                        name,
                        slug,
                        description,
                        currentPrice,
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
        await this.findById(id);
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
        await this.findById(id);
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
        const categories = categoryIds.map((categoryId) => this.categoryService.findById(categoryId));
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
        const { categoryIds, details, imagePaths, description, name, currentPrice, slug, } = dto;
        await this.findById(id);
        let product = undefined;
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
        let product = undefined;
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