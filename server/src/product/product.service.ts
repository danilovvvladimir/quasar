import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Product } from "@prisma/client";
import {
  PRODUCT_CREATE_ERROR_MESSAGE,
  PRODUCT_DELETE_ERROR_MESSAGE,
  PRODUCT_NOT_FOUND_MESSAGE,
  PRODUCT_UPDATE_ERROR_MESSAGE,
} from "src/constants/product";
import { PrismaService } from "src/database/prisma.service";
import {
  ProductCategoryCreateDTO,
  ProductCreateDTO,
  ProductDetailsCreateDTO,
  ProductImagesCreateDTO,
  ProductUpdateDTO,
} from "./product.dto";
import { CategoryService } from "src/category/category.service";

@Injectable()
export class ProductService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly categoryService: CategoryService,
  ) {}

  async findAll() {
    const products = await this.prismaService.product.findMany({
      include: { productImage: true, review: true },
    });

    return products;
  }

  async findById(id: string) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
      include: {
        productImage: true,
        productSize: true,
      },
    });

    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_MESSAGE);
    }

    return product;
  }

  async findBySlug(slug: string) {
    const product = await this.prismaService.product.findUnique({
      where: { slug },
      include: { productImage: true, productSize: true },
    });

    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_MESSAGE);
    }

    return product;
  }

  async findByCategoryId(categoryId: string) {
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

  async findSizeQuantiy(id: string) {
    await this.findById(id);

    const details = await this.prismaService.productSize.findMany({
      where: {
        productId: id,
      },
    });

    return details;
  }

  async findImages(id: string) {
    await this.findById(id);

    const images = await this.prismaService.productImage.findMany({
      where: {
        productId: id,
      },
    });

    return images;
  }

  async create(dto: ProductCreateDTO) {
    const {
      description,
      details,
      imagePaths,
      categoryIds,
      name,
      currentPrice,
      slug,
      oldPrice,
    } = dto;

    let product: Product = undefined;

    try {
      // Начало транзакции
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
    } catch (error) {
      const err = error as Error;
      console.log(err.message);

      // Обработка ошибок транзакции
      throw new HttpException(
        PRODUCT_CREATE_ERROR_MESSAGE,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return product;
  }

  private async createProductDetails(id: string, dto: ProductDetailsCreateDTO) {
    await this.findById(id);

    const { details } = dto;

    const detailsPromises = details.map((detail) =>
      this.prismaService.productSize.create({
        data: {
          productId: id,
          size: detail.size,
          quantity: detail.quantity,
        },
      }),
    );

    await Promise.all(detailsPromises);

    return detailsPromises;
  }

  private async createProductImages(id: string, dto: ProductImagesCreateDTO) {
    await this.findById(id);

    const { imagePaths } = dto;

    const imagesPromises = imagePaths.map((imagePath) =>
      this.prismaService.productImage.create({
        data: {
          productId: id,
          imagePath,
        },
      }),
    );

    await Promise.all(imagesPromises);

    return imagesPromises;
  }

  private async createProductCategories(
    id: string,
    dto: ProductCategoryCreateDTO,
  ) {
    const { categoryIds } = dto;

    const categories = categoryIds.map((categoryId) =>
      this.categoryService.findById(categoryId),
    );

    const productCategoriesPromises = categoryIds.map((categoryId) =>
      this.prismaService.productCategory.create({
        data: {
          productId: id,
          categoryId,
        },
      }),
    );

    await Promise.all(productCategoriesPromises);

    return productCategoriesPromises;
  }

  async update(id: string, dto: ProductUpdateDTO) {
    const {
      categoryIds,
      details,
      imagePaths,
      description,
      name,
      currentPrice,
      slug,
    } = dto;
    await this.findById(id);
    let product: Product = undefined;
    try {
      // Начало транзакции
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
    } catch (error) {
      // Обработка ошибок транзакции
      throw new HttpException(
        PRODUCT_UPDATE_ERROR_MESSAGE,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return product;
  }

  async delete(id: string) {
    await this.findById(id);

    let product: Product = undefined;

    try {
      // Начало транзакции
      product = await this.prismaService.$transaction(async (prisma) => {
        await this.deleteProductCategories(id);

        await this.deleteProductImages(id);

        await this.deleteProductDetails(id);

        const deletedProduct = await prisma.product.delete({
          where: { id },
        });

        return deletedProduct;
      });
    } catch (error) {
      // Обработка ошибок транзакции
      throw new HttpException(
        PRODUCT_DELETE_ERROR_MESSAGE,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return product;
  }

  private async deleteProductImages(id: string) {
    await this.prismaService.productImage.deleteMany({
      where: { productId: id },
    });

    return { message: "success" };
  }

  private async deleteProductDetails(id: string) {
    await this.prismaService.productSize.deleteMany({
      where: { productId: id },
    });

    return { message: "success" };
  }

  private async deleteProductCategories(id: string) {
    await this.prismaService.productCategory.deleteMany({
      where: { productId: id },
    });

    return { message: "success" };
  }
}
