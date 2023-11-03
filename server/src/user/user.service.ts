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

    // const userWithRenamedFields = {
    //   ...rest,
    //   cartItems: cartItem,
    //   reviews: review,
    //   orders: order,
    //   wishlistItems: wishlistItem,
    // };

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

    // const userWithRenamedFields = {
    //   ...rest,
    //   cartItems: cartItem,
    //   reviews: review,
    //   orders: order,
    //   wishlistItems: wishlistItem,
    // };

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

    const wishlistItems = await this.prismaService.wishlistItem.findMany({
      where: { userId },
      include: {
        product: {
          include: {
            productImages: true,
            reviews: true,
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
            productImages: true,
            productSizes: true,
          },
        },
      },
    });

    // const formattedCartItems = cartItems.map((cartItem) => {
    //   const { product, ...rest } = cartItem;

    //   const { productImage, productSize, ...productRest } = product;

    //   return {
    //     ...rest,
    //     product: {
    //       ...productRest,
    //       productImages: productImage,
    //       productSizes: productSize,
    //     },
    //   };
    // });

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
}
