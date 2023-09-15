import { Injectable, NotFoundException } from "@nestjs/common";
import { USER_NOT_FOUND_MESSAGE } from "src/constants/user";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

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
