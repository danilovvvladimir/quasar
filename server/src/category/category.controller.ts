import {
  Controller,
  Get,
  HttpCode,
  Post,
  Param,
  Body,
  UsePipes,
  Put,
  Delete,
  ValidationPipe,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryCreateDTO, CategoryUpdateDTO } from "./category.dto";
import { Auth } from "src/decorators/auth";

@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get("by-id/:id")
  async findById(@Param("id") id: string) {
    return this.categoryService.findById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get("by-slug/:slug")
  async findBySlug(@Param("slug") slug: string) {
    return this.categoryService.findBySlug(slug);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@Body() dto: CategoryCreateDTO) {
    return this.categoryService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(":id")
  @Auth()
  async createDetails(@Param("id") id: string, @Body() dto: CategoryUpdateDTO) {
    return this.categoryService.update(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(":id")
  @Auth()
  async createImages(@Param("id") id: string) {
    return this.categoryService.delete(id);
  }
}
