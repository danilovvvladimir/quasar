import {
  Controller,
  HttpCode,
  Put,
  Get,
  UsePipes,
  ValidationPipe,
  Body,
  Param,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { Auth } from "src/decorators/auth";
import { CurrentUser } from "src/decorators/user";

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
  @Get("profile")
  @Auth()
  async getProfile(@CurrentUser("id") id: string) {
    return this.userService.findById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get("by-id/:id")
  async findById(@Param("id") id: string) {
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
  async findOrders(@Param("userId") userId: string) {
    return this.userService.findOrders(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get(":userId/wishlist-items")
  async findWishlistItems(@Param("userId") userId: string) {
    return this.userService.findWishlistItems(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get(":userId/cart-items")
  async findCartItems(@Param("userId") userId: string) {
    return this.userService.findCartItems(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put("/cart-items/:id")
  async updateCartItemQuantity(
    @Param("id") id: string,
    @Body() newQuantity: number,
  ) {
    return this.userService.updateCartItem(id, newQuantity);
  }
}
