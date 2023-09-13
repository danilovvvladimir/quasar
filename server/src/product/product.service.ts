import { Injectable, NotFoundException } from "@nestjs/common";
import { PRODUCT_NOT_FOUND_MESSAGE } from "src/constants/product";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    const products = await this.prismaService.product.findMany();

    return products;
  }

  async findById(id: string) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_MESSAGE);
    }

    return product;
  }

  async findBySlug(slug: string) {
    const product = await this.prismaService.product.findUnique({
      where: { slug },
    });

    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_MESSAGE);
    }

    return product;
  }

  async findByCategoryId(categoryId: string) {
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

  async findSizeQuantiy(id: string) {
    const details = await this.prismaService.productSize.findMany({
      where: {
        productId: id,
      },
    });

    return details;
  }

  async findImages(id: string) {
    const images = await this.prismaService.productImage.findMany({
      where: {
        productId: id,
      },
    });

    return images;
  }

  async create(name: string, slug: string, description: string, price: number) {
    const product = await this.prismaService.product.create({
      data: {
        name,
        slug,
        description,
        price,
      },
    });

    return product;
  }

  async createProductDetails(id: string, size: number, quantity: number) {
    await this.findById(id);

    const productDetails = await this.prismaService.productSize.create({
      data: {
        productId: id,
        quantity,
        size,
      },
    });

    return productDetails;
  }

  async createProductImage(id: string, imagePath: string) {
    await this.findById(id);

    const productImage = await this.prismaService.productImage.create({
      data: {
        productId: id,
        imagePath,
      },
    });

    return productImage;
  }

  async createProductCategory(id: string, categoryId: string) {
    await this.findById(id);

    const productCategory = await this.prismaService.productCategory.create({
      data: {
        productId: id,
        categoryId,
      },
    });

    return productCategory;
  }

  async update(
    id: string,
    name: string,
    slug: string,
    description: string,
    price: number,
    discountPercentage: number,
  ) {
    await this.findById(id);

    const product = await this.prismaService.product.update({
      where: {
        id,
      },
      data: {
        name,
        slug,
        description,
        price,
        discountPercentage,
      },
    });

    return product;
  }

  async updateDetails(
    productDetailsId: string,
    size: number,
    quantity: number,
  ) {
    const productDetails = await this.prismaService.productSize.update({
      where: {
        id: productDetailsId,
      },
      data: {
        size,
        quantity,
      },
    });

    return productDetails;
  }

  async updateImage(productImageId: string, imagePath: string) {
    const productImage = await this.prismaService.productImage.update({
      where: {
        id: productImageId,
      },
      data: {
        imagePath,
      },
    });

    return productImage;
  }

  async updateCategory(productCategoryId: string, categoryId: string) {
    const productCategory = await this.prismaService.productCategory.update({
      where: {
        id: productCategoryId,
      },
      data: {
        categoryId,
      },
    });

    return productCategory;
  }

  async delete(id: string) {
    await this.findById(id);

    const product = await this.prismaService.product.delete({ where: { id } });

    return product;
  }
}
