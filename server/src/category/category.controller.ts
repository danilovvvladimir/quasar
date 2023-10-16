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
  UseGuards,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryCreateDTO, CategoryUpdateDTO } from "./category.dto";
import { Roles } from "src/decorators/role";
import { AccessTokenGuard } from "src/guard/accessToken";
import { RolesGuard } from "src/guard/roles";

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
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN")
  async create(@Body() dto: CategoryCreateDTO) {
    return this.categoryService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(":id")
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN")
  async update(@Param("id") id: string, @Body() dto: CategoryUpdateDTO) {
    return this.categoryService.update(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(":id")
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN")
  async delete(@Param("id") id: string) {
    return this.categoryService.delete(id);
  }
}
