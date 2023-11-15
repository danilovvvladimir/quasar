import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { Auth } from "src/decorators/auth";
import { OrderCreateDTO, UpdateStatusDTO } from "./order.dto";
import { OrderStatus } from "@prisma/client";
import { Roles } from "src/decorators/role";
import { AccessTokenGuard } from "src/guard/accessToken";
import { RolesGuard } from "src/guard/roles";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN")
  async findAll() {
    return this.orderService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get("by-id/:id")
  @UseGuards(AccessTokenGuard)
  async findById(@Param("id") id: string) {
    return this.orderService.findById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get("by-user/:userId")
  @UseGuards(AccessTokenGuard)
  async findByUserId(@Param("userId") userId: string) {
    return this.orderService.findByUserId(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get("by-product/:productId")
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN")
  async findByProductId(@Param("productId") productId: string) {
    return this.orderService.findByProductId(productId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @UseGuards(AccessTokenGuard)
  async create(@Body() dto: OrderCreateDTO) {
    return this.orderService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put("status")
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN")
  async updateStatus(@Body() dto: UpdateStatusDTO) {
    return this.orderService.updateStatus(dto);
  }
}
