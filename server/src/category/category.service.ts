import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import {
  CATEGORY_DELETE_PRODUCTS_MESSAGE,
  CATEGORY_NOT_FOUND_MESSAGE,
  CATEGORY_SLUG_DUBLICATE_MESSAGE,
} from "src/constants/category";
import { PrismaService } from "src/database/prisma.service";
import { CategoryCreateDTO, CategoryUpdateDTO } from "./category.dto";

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    const categories = await this.prismaService.category.findMany({
      where: { isVisible: true },
    });

    return categories;
  }

  async findById(id: string) {
    const category = await this.prismaService.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(CATEGORY_NOT_FOUND_MESSAGE);
    }

    return category;
  }

  async findBySlug(slug: string) {
    const category = await this.prismaService.category.findUnique({
      where: { slug },
    });

    if (!category) {
      throw new NotFoundException(CATEGORY_NOT_FOUND_MESSAGE);
    }

    return category;
  }

  async create(dto: CategoryCreateDTO) {
    const { isVisible, name, slug } = dto;

    if (await this.prismaService.category.findUnique({ where: { slug } })) {
      throw new BadRequestException(CATEGORY_SLUG_DUBLICATE_MESSAGE);
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

  async update(id: string, dto: CategoryUpdateDTO) {
    const { isVisible, name, slug } = dto;

    const existingCategoryWithSlug =
      await this.prismaService.category.findUnique({ where: { slug } });

    if (existingCategoryWithSlug.id !== id) {
      throw new BadRequestException(CATEGORY_SLUG_DUBLICATE_MESSAGE);
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

  async delete(id: string) {
    await this.findById(id);

    const existingCategoryProducts = await this.prismaService.product.findMany({
      where: { categories: { some: { categoryId: id } } },
    });

    if (existingCategoryProducts.length !== 0) {
      throw new BadRequestException(CATEGORY_DELETE_PRODUCTS_MESSAGE);
    }

    const category = await this.prismaService.category.delete({
      where: { id },
    });

    return category;
  }
}
