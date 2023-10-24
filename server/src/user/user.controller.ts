import {
  Controller,
  HttpCode,
  Put,
  Get,
  UsePipes,
  ValidationPipe,
  Body,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CurrentUser } from "src/decorators/user";
import { Roles } from "src/decorators/role";
import { AccessTokenGuard } from "src/guard/accessToken";
import { RolesGuard } from "src/guard/roles";
import { CartItemCreateDTO } from "./user.dto";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN")
  async findAll() {
    return this.userService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get("profile")
  @UseGuards(AccessTokenGuard)
  async getProfile(@CurrentUser("id") id: string) {
    return this.userService.findById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get("by-id/:id")
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN")
  async findById(@Param("id") id: string) {
    return this.userService.findById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get("by-email/:email")
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN")
  async findByEmail(@Param("email") email: string) {
    return this.userService.findByEmail(email);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get(":userId/orders")
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN")
  async findOrders(@Param("userId") userId: string) {
    return this.userService.findOrders(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get(":userId/wishlist-items")
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN")
  async findWishlistItems(@Param("userId") userId: string) {
    return this.userService.findWishlistItems(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get(":userId/cart-items")
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN")
  async findCartItems(@Param("userId") userId: string) {
    return this.userService.findCartItems(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("/cart-item")
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN")
  async createCartItem(@Body() dto: CartItemCreateDTO) {
    return this.userService.createCartItem(dto);
  }

  // OriginalUserId check???
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
