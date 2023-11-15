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
  Delete,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CurrentUser } from "src/decorators/user";
import { Roles } from "src/decorators/role";
import { AccessTokenGuard } from "src/guard/accessToken";
import { RolesGuard } from "src/guard/roles";
import {
  CartItemCreateDTO,
  UserUpdateDTO,
  WishlistItemToggleDTO,
} from "./user.dto";

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
  @Get("statistics")
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN")
  async getStatistics() {
    return this.userService.getStatistics();
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
  @UseGuards(AccessTokenGuard)
  async findOrders(@Param("userId") userId: string) {
    return this.userService.findOrders(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get(":userId/wishlist-items")
  @UseGuards(AccessTokenGuard)
  async findWishlistItems(@Param("userId") userId: string) {
    return this.userService.findWishlistItems(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get(":userId/cart-items")
  @UseGuards(AccessTokenGuard)
  async findCartItems(@Param("userId") userId: string) {
    return this.userService.findCartItems(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("/cart-item")
  @UseGuards(AccessTokenGuard)
  async createCartItem(@Body() dto: CartItemCreateDTO) {
    return this.userService.createCartItem(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("/wishlist-item/:id")
  @UseGuards(AccessTokenGuard)
  async toggleWishlistItem(@Body() dto: WishlistItemToggleDTO) {
    return this.userService.toggleWishlistItems(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete("/cart-item/:id")
  @UseGuards(AccessTokenGuard)
  async deleteCartItem(@Param("id") id: string) {
    return this.userService.deleteCartItem(id);
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

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put()
  @UseGuards(AccessTokenGuard)
  async update(@CurrentUser("id") id: string, @Body() dto: UserUpdateDTO) {
    return this.userService.update(dto, id);
  }
}
