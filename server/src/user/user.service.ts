import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { hash } from "argon2";
import { Pool, QueryResult } from "pg";
import { AuthRegisterDTO } from "src/auth/auth.dto";
import {
  USER_CREATE_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
} from "src/constants/user";
import { PG_CONNECTION } from "src/database/database.module";
import { UserQueryCreatorService } from "src/queries/userQueryCreator.service";
import { User } from "src/types/user";

@Injectable()
export class UserService {
  constructor(
    @Inject(PG_CONNECTION) private connectionService: Pool,
    private readonly userQueryCreatorService: UserQueryCreatorService,
  ) {}

  async findAll() {
    const response: QueryResult<User> = await this.connectionService.query(
      this.userQueryCreatorService.getAllQuery(),
    );

    return response.rows;
  }

  async findById(id: number) {
    const response: QueryResult<User> = await this.connectionService.query(
      this.userQueryCreatorService.getByIdQuery(id),
    );

    if (!response.rowCount) {
      throw new NotFoundException(USER_NOT_FOUND_MESSAGE);
    }

    return response.rows[0];
  }

  async findByEmail(email: string) {
    const response: QueryResult<User> = await this.connectionService.query(
      this.userQueryCreatorService.getByEmailQuery(email),
    );

    if (!response.rowCount) {
      throw new NotFoundException(USER_NOT_FOUND_MESSAGE);
    }

    return response.rows[0];
  }

  async findOrders(userId: number) {
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
    await this.connectionService.query(
      this.userQueryCreatorService.getCreateQuery(
        email,
        username,
        passwordHash,
      ),
    );

    return { message: USER_CREATE_MESSAGE };
  }
}
