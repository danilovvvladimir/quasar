import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { hash } from "argon2";
import { Pool, QueryResult } from "pg";
import { AuthRegisterDTO } from "src/auth/auth.dto";
import {
  USER_CREATE_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
} from "src/constants/user";
import { PrismaService } from "src/database/prisma.service";
import { User } from "src/types/user";

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    const users = await this.prismaService.user.findMany();

    return users;
  }

  async findById(id: string) {
    const user = this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_MESSAGE);
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = this.prismaService.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_MESSAGE);
    }

    return user;
  }

  async findOrders(userId: string) {
    const user = await this.findById(userId);

    const response: QueryResult<User> = await this.connectionService.query(
      this.userQueryCreatorService.getOrdersQuery(userId),
    );

    return response.rows;
  }

  async findWishlistItems(userId: number) {
    const user = await this.findById(userId);

    const response: QueryResult<User> = await this.connectionService.query(
      this.userQueryCreatorService.getWishlistItemsQuery(userId),
    );

    return response.rows;
  }

  async findCartItems(userId: number) {
    const user = await this.findById(userId);

    const response: QueryResult<User> = await this.connectionService.query(
      this.userQueryCreatorService.getCartItemsQuery(userId),
    );

    return response.rows;
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
