import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Prisma, Product } from "@prisma/client";
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
import { AllProductsConfig } from "src/types/product";

@Injectable()
export class ProductService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly categoryService: CategoryService,
  ) {}

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

  async findAll(config: AllProductsConfig) {
    const {
      currentMaxPrice,
      currentMinPrice,
      isDiscount,
      rating,
      selectedCategories,
      searchTerm,
      sorting,
      skip,
      take,
    } = config;

    let options: Prisma.ProductWhereInput = {};

    if (searchTerm) {
      options = {
        name: {
          contains: searchTerm,
          mode: "insensitive",
        },
      };
    }

    if (currentMinPrice && currentMaxPrice) {
      options = {
        ...options,
        currentPrice: {
          gte: currentMinPrice,
          lte: currentMaxPrice,
        },
      };
    }

    if (selectedCategories && selectedCategories.length > 0) {
      options = {
        ...options,
        categories: {
          some: {
            Category: {
              name: {
                in: selectedCategories,
              },
            },
          },
        },
      };
    }

    if (isDiscount) {
      options = {
        ...options,
        AND: {
          oldPrice: {
            gt: 0,
          },
        },
      };
    }

    // if (rating) {
    //   options = {
    //     ...options,
    //     AND: {
    //       review: {
    //         some: {
    //           rating: {
    //             gte: +rating,
    //           },
    //         },
    //       },
    //     },
    //   };
    // }

    // console.log("ag", ag);

    // const result = await this.prismaService.review.groupBy({
    //   by: ["product_id"],
    //   _avg: {
    //     rating: true,
    //   },
    //   having: {
    //     rating: {
    //       gte: 4,
    //     },
    //   },
    // });

    if (rating > 0) {
      const result = await this.prismaService.review.groupBy({
        by: ["productId"],
        having: {
          rating: {
            _avg: {
              gte: +rating,
            },
          },
        },
      });

      options = {
        ...options,
        AND: {
          id: {
            in: result.map((item) => item.productId),
          },
        },
      };
    }

    const products = await this.prismaService.product.findMany({
      include: { productImages: true, reviews: true, productSizes: true },
      where: options,
      orderBy: this.getProductOrderBy(sorting),
      skip: skip ? +skip : 0,
      take: +take,
    });

    const allProductsLength = await this.prismaService.product.count({
      where: options,
    });

    return { products: products, count: allProductsLength };
  }

  private getProductOrderBy(sorting?: string) {
    let orderBy: Prisma.ProductOrderByWithAggregationInput = {};

    if (sorting === "by-rating") {
      orderBy = {};
    } else if (sorting === "price-asc") {
      orderBy = {
        currentPrice: "asc",
      };
    } else if (sorting === "price-desc") {
      orderBy = {
        currentPrice: "desc",
      };
    } else if (sorting === "date-asc") {
      orderBy = {
        createdAt: "asc",
      };
    } else if (sorting === "date-desc") {
      orderBy = {
        createdAt: "desc",
      };
    } else {
      orderBy = {};
    }

    return orderBy;
  }

  async findById(id: string) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
      include: {
        productImages: true,
        productSizes: true,
        reviews: true,
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
      include: { productImages: true, productSizes: true, reviews: true },
    });

    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_MESSAGE);
    }

    return product;
  }

  async findByCategoryId(categoryId: string) {
    await this.categoryService.findById(categoryId);

    const products = await this.prismaService.product.findMany({
      include: { productImages: true, productSizes: true, reviews: true },
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

    await categoryIds.map((categoryId) =>
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
