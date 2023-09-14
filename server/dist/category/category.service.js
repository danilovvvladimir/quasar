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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const category_1 = require("../constants/category");
const prisma_service_1 = require("../database/prisma.service");
let CategoryService = class CategoryService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async findAll() {
        const categories = await this.prismaService.category.findMany({
            where: { isVisible: true },
        });
        return categories;
    }
    async findById(id) {
        const category = await this.prismaService.category.findUnique({
            where: { id },
        });
        if (!category) {
            throw new common_1.NotFoundException(category_1.CATEGORY_NOT_FOUND_MESSAGE);
        }
        return category;
    }
    async findBySlug(slug) {
        const category = await this.prismaService.category.findUnique({
            where: { slug },
        });
        if (!category) {
            throw new common_1.NotFoundException(category_1.CATEGORY_NOT_FOUND_MESSAGE);
        }
        return category;
    }
    async create(dto) {
        const { isVisible, name, slug } = dto;
        if (await this.prismaService.category.findUnique({ where: { slug } })) {
            throw new common_1.BadRequestException(category_1.CATEGORY_SLUG_DUBLICATE_MESSAGE);
        }
        const category = await this.prismaService.category.create({
            data: {
                isVisible,
                name,
                slug,
            },
        });
        return category;
    }
    async update(id, dto) {
        const { isVisible, name, slug } = dto;
        const existingCategoryWithSlug = await this.prismaService.category.findUnique({ where: { slug } });
        if (existingCategoryWithSlug.id !== id) {
            throw new common_1.BadRequestException(category_1.CATEGORY_SLUG_DUBLICATE_MESSAGE);
        }
        const category = await this.prismaService.category.update({
            where: { id },
            data: {
                isVisible,
                name,
                slug,
            },
        });
        return category;
    }
    async delete(id) {
        await this.findById(id);
        const existingCategoryProducts = await this.prismaService.product.findMany({
            where: { categories: { some: { categoryId: id } } },
        });
        if (existingCategoryProducts.length !== 0) {
            throw new common_1.BadRequestException(category_1.CATEGORY_DELETE_PRODUCTS_MESSAGE);
        }
        const category = await this.prismaService.category.delete({
            where: { id },
        });
        return category;
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryService);
//# sourceMappingURL=category.service.js.map