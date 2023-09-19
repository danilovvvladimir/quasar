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
  UseGuards,
} from "@nestjs/common";
import { ReviewService } from "./review.service";
import { ReviewCreateDTO, ReviewUpdateDTO } from "./review.dto";
import { CurrentUser } from "src/decorators/user";
import { Roles } from "src/decorators/role";
import { RolesGuard } from "src/guard/roles";
import { AccessTokenGuard } from "src/guard/accessToken";

@Controller("reviews")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN")
  async findAll() {
    return this.reviewService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get("by-id/:id")
  async findById(@Param("id") id: string) {
    return this.reviewService.findById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get("by-product/:productId")
  async findByProductIdId(@Param("productId") productId: string) {
    return this.reviewService.findByProductId(productId);
  }

  // @CurrentUser("id") userId: string,@CurrentUser("role") userRole: string,
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get("by-user/:userId")
  @UseGuards(AccessTokenGuard)
  async findByUserId(@Param("userId") userId: string) {
    return this.reviewService.findByUserId(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN")
  async create(@Body() dto: ReviewCreateDTO) {
    return this.reviewService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(":id")
  @UseGuards(AccessTokenGuard)
  async update(
    @Param("id") id: string,
    @CurrentUser("id") userId: string,
    @CurrentUser("role") userRole: string,
    @Body() dto: ReviewUpdateDTO,
  ) {
    return this.reviewService.update(id, userId, userRole, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(":id")
  @UseGuards(AccessTokenGuard)
  async delete(
    @Param("id") id: string,
    @CurrentUser("id") userId: string,
    @CurrentUser("role") userRole: string,
  ) {
    return this.reviewService.delete(id, userId, userRole);
  }
}
