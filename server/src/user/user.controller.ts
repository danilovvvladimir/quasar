import {
  Controller,
  HttpCode,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  Body,
  Put,
  Patch,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get("by-id/:id")
  async findById(@Param("id", ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get("by-email/:email")
  async findByEmail(@Param("email") email: string) {
    return this.userService.findByEmail(email);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get(":userId/orders")
  async findOrders(@Param("userId", ParseIntPipe) userId: number) {
    return this.userService.findOrders(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get(":userId/wishlist-items")
  async findWishlistItems(@Param("userId", ParseIntPipe) userId: number) {
    return this.userService.findWishlistItems(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get(":userId/cart-items")
  async findCartItems(@Param("userId", ParseIntPipe) userId: number) {
    return this.userService.findCartItems(userId);
  }
}
