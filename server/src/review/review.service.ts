import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import {
  REVIEW_CREATE_DUBLICATE_MESSAGE,
  REVIEW_CREATE_NO_ORDER_MESSAGE,
  REVIEW_NOT_FOUND_MESSAGE,
  REVIEW_UPDATE_OTHER_USER_MESSAGE,
} from "src/constants/review";
import { PrismaService } from "src/database/prisma.service";
import { ProductService } from "src/product/product.service";
import { UserService } from "src/user/user.service";
import { ReviewCreateDTO } from "./review.dto";

@Injectable()
export class ReviewService {
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly prismaService: PrismaService,
  ) {}

  async findAll() {
    const reviews = await this.prismaService.review.findMany();

    return reviews;
  }

  async findById(id: string) {
    const review = await this.prismaService.order.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException(REVIEW_NOT_FOUND_MESSAGE);
    }

    return review;
  }

  async findByProductId(productId: string) {
    await this.productService.findById(productId);

    const reviews = await this.prismaService.review.findMany({
      where: {
        productId,
      },
    });

    return reviews;
  }

  async findByUserId(userId: string) {
    await this.userService.findById(userId);

    const reviews = await this.prismaService.review.findMany({
      where: {
        userId,
      },
    });

    return reviews;
  }

  async create(dto: ReviewCreateDTO) {
    const { productId, rating, text, userId } = dto;

    await this.productService.findById(productId);
    // connect по review

    const { review: userReviews, order: userOrders } =
      await this.userService.findById(userId);

    // 1) Посмотреть, есть ли у пользователя order с этим продуктом

    const userOrderItemsWIthProduct =
      await this.prismaService.orderItem.findMany({
        where: {
          AND: [
            {
              order: {
                userId,
              },
            },
            { productId },
          ],
        },
      });

    if (!userOrderItemsWIthProduct.length) {
      throw new ConflictException(REVIEW_CREATE_NO_ORDER_MESSAGE);
    }

    // 2) Посмотреть, есть ли у пользователя уже review с этим продуктом

    if (userReviews.filter((r) => r.productId === productId).length) {
      throw new ConflictException(REVIEW_CREATE_DUBLICATE_MESSAGE);
    }

    const review = await this.prismaService.review.create({
      data: {
        rating,
        text,
        productId,
        userId,
      },
    });

    return review;
  }

  async update(id: string, userId: string, dto: ReviewCreateDTO) {
    const { rating, text } = dto;

    const review = await this.findById(id);

    if (review.userId !== userId) {
      throw new ConflictException(REVIEW_UPDATE_OTHER_USER_MESSAGE);
    }

    const updatedReview = await this.prismaService.review.update({
      where: { id },
      data: {
        rating,
        text,
      },
    });

    return updatedReview;
  }
}
