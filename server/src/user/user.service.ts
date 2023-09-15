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

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private readonly productService: ProductService,
  ) {}

  async findAll() {
    const users = await this.prismaService.user.findMany();

    return users;
  }

  async findById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        review: true,
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

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });

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

    const wishlistItems = await this.prismaService.wishlistItem.findMany({
      where: { userId },
    });

    return wishlistItems;
  }

  async findCartItems(userId: string) {
    await this.findById(userId);

    const cartItems = await this.prismaService.cartItem.findMany({
      where: { userId },
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
    });

    return user;
  }
}
