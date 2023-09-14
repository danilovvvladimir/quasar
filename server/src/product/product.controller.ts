import {
  Controller,
  Get,
  HttpCode,
  UsePipes,
  Put,
  Body,
  Delete,
  Post,
  ValidationPipe,
  Param,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductCreateDTO, ProductUpdateDTO } from "./product.dto";
import { Auth } from "src/decorators/auth";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get("by-id/:id")
  async findById(@Param("id") id: string) {
    return this.productService.findById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get("by-slug/:slug")
  async findBySlug(@Param("slug") slug: string) {
    return this.productService.findBySlug(slug);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get("by-category/:categoryId")
  async findByCategoryId(@Param("categoryId") categoryId: string) {
    return this.productService.findByCategoryId(categoryId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get(":id/details")
  async findDetails(@Param("id") id: string) {
    return this.productService.findSizeQuantiy(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get(":id/images")
  async findImages(@Param("id") id: string) {
    return this.productService.findImages(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@Body() dto: ProductCreateDTO) {
    return this.productService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(":id")
  @Auth()
  async createDetails(@Param("id") id: string, @Body() dto: ProductUpdateDTO) {
    return this.productService.update(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(":id")
  @Auth()
  async createImages(@Param("id") id: string) {
    return this.productService.delete(id);
  }
}
