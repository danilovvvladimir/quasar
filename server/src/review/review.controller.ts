import {
  Body,
  Controller,
  Get,
  HttpCode,
  Delete,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ReviewService } from "./review.service";
import { ReviewCreateDTO, ReviewUpdateDTO } from "./review.dto";
import { CurrentUser } from "src/decorators/user";
import { Auth } from "src/decorators/auth";

@Controller("reviews")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get()
  @Auth()
  async findAll() {
    return this.reviewService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get("by-id/:id")
  @Auth()
  async findById(@Param("id") id: string) {
    return this.reviewService.findById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get("by-product/:productId")
  @Auth()
  async findByProductIdId(@Param("productId") productId: string) {
    return this.reviewService.findByProductId(productId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get("by-user/:userId")
  @Auth()
  async findByUserId(@Param("userId") userId: string) {
    return this.reviewService.findByUserId(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@Body() dto: ReviewCreateDTO) {
    return this.reviewService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(":id")
  @Auth()
  async update(
    @Param("id") id: string,
    @CurrentUser("id") userId: string,
    @Body() dto: ReviewUpdateDTO,
  ) {
    return this.reviewService.update(id, userId, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(":id")
  @Auth()
  async delete(@Param("id") id: string) {
    return this.reviewService.delete(id);
  }
}
