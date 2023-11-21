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

    let allProductsLength = 0;

    try {
      const allProductsLengthResult = await this.prismaService.$queryRaw`
      SELECT COUNT(*)::INTEGER as "count"
      FROM "Product" P
      ${
        selectedCategories && selectedCategories.length > 0
          ? Prisma.sql`
            JOIN (
        SELECT DISTINCT PC.product_id
        FROM "ProductCategory" PC
        JOIN "Category" C ON PC.category_id = C.id
        WHERE C.name = ANY(${selectedCategories})
      ) AS Subquery ON P.id = Subquery.product_id
    `
          : Prisma.empty
      }
      WHERE
        1=1
        ${
          searchTerm
            ? Prisma.sql`AND P.name ILIKE ${`%${searchTerm}%`}`
            : Prisma.empty
        }
        ${
          currentMinPrice && currentMaxPrice
            ? Prisma.sql`AND P.current_price BETWEEN ${+currentMinPrice} AND ${+currentMaxPrice}`
            : Prisma.empty
        }
        ${isDiscount ? Prisma.sql`AND P.old_price > 0` : Prisma.empty}
      `;

      allProductsLength = allProductsLengthResult[0].count;
    } catch (error) {
      console.error("Error executing raw query count", error);
    }

    let result = [];

    try {
      result = await this.prismaService.$queryRaw`
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
        ${
          selectedCategories && selectedCategories.length > 0
            ? Prisma.sql`
            JOIN (
        SELECT DISTINCT PC.product_id
        FROM "ProductCategory" PC
        JOIN "Category" C ON PC.category_id = C.id
        WHERE C.name = ANY(${selectedCategories})
      ) AS Subquery ON P.id = Subquery.product_id
    `
            : Prisma.empty
        }
        LEFT JOIN (
        SELECT product_id, COUNT(*) AS reviews_count
        FROM "Review"
        GROUP BY product_id
        ) AS ReviewsCount ON P.id = ReviewsCount.product_id
      WHERE
        1=1
        ${
          searchTerm
            ? Prisma.sql`AND P.name ILIKE ${`%${searchTerm}%`}`
            : Prisma.empty
        }
        ${
          currentMinPrice && currentMaxPrice
            ? Prisma.sql`AND P.current_price BETWEEN ${+currentMinPrice} AND ${+currentMaxPrice}`
            : Prisma.empty
        }
        ${isDiscount ? Prisma.sql`AND P.old_price > 0` : Prisma.empty}
      GROUP BY
      P.id, ReviewsCount.reviews_count
      HAVING
        ${
          rating >= 1
            ? Prisma.sql`AVG(R.rating) >= ${+rating}`
            : Prisma.sql`1=1`
        }
      ORDER BY  
        ${
          sorting === "by-rating"
            ? Prisma.sql`"averageRating" DESC`
            : sorting === "price-asc"
            ? Prisma.sql`current_price ASC`
            : sorting === "price-desc"
            ? Prisma.sql`current_price DESC`
            : sorting === "date-asc"
            ? Prisma.sql`P.created_at ASC`
            : sorting === "date-desc"
            ? Prisma.sql`P.created_at DESC`
            : Prisma.sql`P.id ASC`
        }
      LIMIT ${take ? +take : allProductsLength} OFFSET ${skip ? +skip : 0}
      `;
    } catch (error) {
      console.error("Error executing raw query:", error);
    }

    return { products: result, count: allProductsLength };
  }

  async findById(id: string) {
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
      throw new NotFoundException(PRODUCT_NOT_FOUND_MESSAGE);
    }

    return product;
  }

  async findBySlug(slug: string) {
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
      throw new NotFoundException(PRODUCT_NOT_FOUND_MESSAGE);
    }

    return product;
  }

  async findByCategoryId(categoryId: string) {
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

    let product: Product;

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
    } catch (error) {
      const err = error as Error;
      console.log(err.message);

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
      oldPrice,
      slug,
    } = dto;
    await this.findById(id);

    let product: Product;

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
    } catch (error) {
      throw new HttpException(
        PRODUCT_UPDATE_ERROR_MESSAGE,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return product;
  }

  async delete(id: string) {
    await this.findById(id);

    let product: Product;

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
    } catch (error) {
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
