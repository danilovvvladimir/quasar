import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from "@nestjs/common";
import {
  CART_ITEM_NOT_FOUND_MESSAGE,
  CART_ITEM_WRONG_QUANTITY_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
} from "src/constants/user";
import { PrismaService } from "src/database/prisma.service";
import { ProductService } from "src/product/product.service";
import {
  CartItemCreateDTO,
  UserToggleAdminDTO,
  UserUpdateDTO,
  WishlistItemToggleDTO,
} from "./user.dto";
import { USER_ALREADY_EXISTS_MESSAGE } from "src/constants/auth";
import { hash } from "argon2";

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private readonly productService: ProductService,
  ) {}

  async getStatistics() {
    const allUsers = await this.findAll();
    const allReviews = await this.prismaService.review.findMany();
    const allOrders = await this.prismaService.order.findMany();
    const totalIncome = await this.prismaService.orderItem.aggregate({
      _sum: {
        totalPrice: true,
      },
    });

    return {
      users: allUsers.length,
      reviews: allReviews.length,
      orders: allOrders.length,
      totalIncome: +totalIncome._sum.totalPrice,
    };
  }

  async findAll() {
    const users = await this.prismaService.user.findMany({
      include: {
        reviews: true,
        cartItems: {
          include: {
            product: {
              include: {
                productImages: true,
                productSizes: true,
              },
            },
          },
        },
        wishlistItems: true,
        orders: {
          include: {
            orderItems: true,
          },
        },
      },
    });

    return users;
  }

  async findById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        reviews: true,
        cartItems: {
          include: {
            product: {
              include: {
                productImages: true,
                productSizes: true,
              },
            },
          },
        },
        wishlistItems: true,
        orders: {
          include: {
            orderItems: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_MESSAGE);
    }

    const { password, ...rest } = user;

    return rest;
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      include: {
        reviews: true,
        cartItems: {
          include: {
            product: {
              include: {
                productImages: true,
                productSizes: true,
              },
            },
          },
        },
        wishlistItems: true,
        orders: {
          include: {
            orderItems: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_MESSAGE);
    }

    return user;
  }

  async findOrders(userId: string) {
    await this.findById(userId);

    const orders = await this.prismaService.order.findMany({
      where: { userId },
    });

    return orders;
  }

  async findWishlistItems(userId: string) {
    await this.findById(userId);

    const wishlistItems = await this.prismaService.$queryRaw`
      SELECT        
        P.*,
        P.current_price as "currentPrice",
        P.old_price as "oldPrice",
        COALESCE(AVG(R.rating), 0) AS "averageRating",
        JSON_AGG(PI.*) AS "productImages",
        CAST(COALESCE(reviews_count, 0) AS INTEGER) AS "reviewsCount"
      FROM "WishlistItem" WI
	    LEFT JOIN "Product" P ON P.id = WI.product_id
      LEFT JOIN "Review" R ON P.id = R.product_id
      LEFT JOIN "ProductImage" PI ON P.id = PI.product_id
      LEFT JOIN (
        SELECT product_id, COUNT(*) AS reviews_count
        FROM "Review"
        GROUP BY product_id
        ) AS ReviewsCount ON P.id = ReviewsCount.product_id
        WHERE WI.user_id = ${userId}
      GROUP BY P.id, ReviewsCount.reviews_count
      ORDER BY P.id
    `;

    return wishlistItems;
  }

  async toggleWishlistItems(dto: WishlistItemToggleDTO) {
    const { productId, userId } = dto;

    await this.findById(userId);

    const wishlistItem = await this.prismaService.wishlistItem.findFirst({
      where: { userId, productId },
    });

    let response = {};

    if (wishlistItem) {
      await this.prismaService.wishlistItem.delete({
        where: {
          id: wishlistItem.id,
        },
      });

      response = { mode: "deleted" };
    } else {
      await this.prismaService.wishlistItem.create({
        data: {
          productId,
          userId,
        },
      });

      response = { mode: "created" };
    }

    return response;
  }

  async createCartItem(dto: CartItemCreateDTO) {
    const { productId, size, userId } = dto;

    const cartItem = await this.prismaService.cartItem.create({
      data: {
        quantity: 1,
        size,
        productId,
        userId,
      },
    });

    return cartItem;
  }

  async deleteCartItem(cartItemId: string) {
    const deletedItem = await this.prismaService.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });

    return deletedItem;
  }

  async findCartItems(userId: string) {
    await this.findById(userId);

    const cartItems = await this.prismaService.cartItem.findMany({
      where: { userId },
      include: {
        product: {
          include: {
            productImages: true,
            productSizes: true,
          },
        },
      },
    });

    return cartItems;
  }

  async updateCartItem(id: string, newQuantity: number) {
    const cartItem = await this.prismaService.cartItem.findUnique({
      where: { id },
    });

    if (!cartItem) {
      throw new NotFoundException(CART_ITEM_NOT_FOUND_MESSAGE);
    }

    const productDetails = await this.productService.findSizeQuantiy(
      cartItem.productId,
    );

    const neededProductWithDetails = productDetails.filter(
      (pd) => pd.size === cartItem.size,
    )[0];

    if (newQuantity > neededProductWithDetails.quantity) {
      throw new ConflictException(CART_ITEM_WRONG_QUANTITY_MESSAGE);
    }

    const updateCartItem = await this.prismaService.cartItem.update({
      where: { id },
      data: {
        quantity: newQuantity,
      },
    });

    return updateCartItem;
  }

  async create(email: string, username: string, passwordHash: string) {
    const user = await this.prismaService.user.create({
      data: {
        email,
        username,
        password: passwordHash,
      },
      include: {
        reviews: true,
        cartItems: {
          include: {
            product: {
              include: {
                productImages: true,
                productSizes: true,
              },
            },
          },
        },
        wishlistItems: true,
        orders: {
          include: {
            orderItems: true,
          },
        },
      },
    });

    return user;
  }

  async update(dto: UserUpdateDTO, id: string) {
    const { email, password, username } = dto;

    const userWithSameEmail = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail && userWithSameEmail.id !== id) {
      throw new BadRequestException(USER_ALREADY_EXISTS_MESSAGE);
    }

    const updatedUser = await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: password
        ? {
            email,
            username,
            password: await hash(password),
          }
        : {
            email,
            username,
          },
    });

    return updatedUser;
  }

  async toggleAdminRole(dto: UserToggleAdminDTO) {
    const { userId, isAdmin } = dto;

    const updatedUser = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        role: isAdmin ? "ADMIN" : "USER",
      },
    });

    return updatedUser;
  }
}
