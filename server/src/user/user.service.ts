import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import {
  CART_ITEM_NOT_FOUND_MESSAGE,
  CART_ITEM_WRONG_QUANTITY_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
} from "src/constants/user";
import { PrismaService } from "src/database/prisma.service";
import { ProductService } from "src/product/product.service";
import { CartItemCreateDTO, WishlistItemToggleDTO } from "./user.dto";

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
        review: true,
        cartItem: {
          include: {
            product: {
              include: {
                productImage: true,
                productSize: true,
              },
            },
          },
        },
        wishlistItem: true,
        order: {
          include: {
            orderItem: true,
          },
        },
      },
    });

    const usersWithFormattedFields = users.map((user) => {
      const {
        password,
        cartItem,
        review,
        order,
        wishlistItem,
        createdAt,
        updatedAt,
        ...rest
      } = user;

      const userWithRenamedFields = {
        ...rest,
        createdAt: createdAt,
        updatedAt: updatedAt,
        cartItems: cartItem,
        reviews: review,
        orders: order,
        wishlistItems: wishlistItem,
      };
      console.log("userWithRenamedFields", userWithRenamedFields);

      return userWithRenamedFields;
    });

    return usersWithFormattedFields;
  }

  async findById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        review: true,
        cartItem: {
          include: {
            product: {
              include: {
                productImage: true,
                productSize: true,
              },
            },
          },
        },
        wishlistItem: true,
        order: {
          include: {
            orderItem: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_MESSAGE);
    }

    const { password, cartItem, review, order, wishlistItem, ...rest } = user;

    const userWithRenamedFields = {
      ...rest,
      cartItems: cartItem,
      reviews: review,
      orders: order,
      wishlistItems: wishlistItem,
    };

    return userWithRenamedFields;
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      include: {
        review: true,
        cartItem: {
          include: {
            product: {
              include: {
                productImage: true,
                productSize: true,
              },
            },
          },
        },
        wishlistItem: true,
        order: {
          include: {
            orderItem: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_MESSAGE);
    }

    const { cartItem, review, order, wishlistItem, ...rest } = user;

    const userWithRenamedFields = {
      ...rest,
      cartItems: cartItem,
      reviews: review,
      orders: order,
      wishlistItems: wishlistItem,
    };

    return userWithRenamedFields;
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

    const wishlistItems = await this.prismaService.wishlistItem.findMany({
      where: { userId },
      include: {
        product: {
          include: {
            productImage: true,
            review: true,
          },
        },
      },
    });

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
            productImage: true,
            productSize: true,
          },
        },
      },
    });

    const formattedCartItems = cartItems.map((cartItem) => {
      const { product, ...rest } = cartItem;

      const { productImage, productSize, ...productRest } = product;

      return {
        ...rest,
        product: {
          ...productRest,
          productImages: productImage,
          productSizes: productSize,
        },
      };
    });

    return formattedCartItems;
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
        review: true,
        cartItem: {
          include: {
            product: {
              include: {
                productImage: true,
                productSize: true,
              },
            },
          },
        },
        wishlistItem: true,
        order: {
          include: {
            orderItem: true,
          },
        },
      },
    });

    return user;
  }
}
