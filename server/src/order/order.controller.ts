import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { Auth } from "src/decorators/auth";
import { OrderCreateDTO } from "./order.dto";
import { OrderStatus } from "@prisma/client";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get()
  @Auth()
  async findAll() {
    return this.orderService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get("by-id/:id")
  @Auth()
  async findById(@Param("id") id: string) {
    return this.orderService.findById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get("by-user/:userId")
  @Auth()
  async findByUserId(@Param("userId") userId: string) {
    return this.orderService.findByUserId(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get("by-product/:productId")
  @Auth()
  async findByProductId(@Param("productId") productId: string) {
    return this.orderService.findByProductId(productId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@Body() dto: OrderCreateDTO) {
    return this.orderService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(":id")
  @Auth()
  async updateStatus(
    @Param("id") id: string,
    @Body() newOrderStatus: OrderStatus,
  ) {
    return this.orderService.updateStatus(id, newOrderStatus);
  }
}
