import {
  Controller,
  Get,
  HttpCode,
  UsePipes,
  Put,
  Body,
  Delete,
  Post,
  Query,
  ValidationPipe,
  Param,
  UseGuards,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductCreateDTO, ProductUpdateDTO } from "./product.dto";
import { Auth } from "src/decorators/auth";
import { AccessTokenGuard } from "src/guard/accessToken";
import { RolesGuard } from "src/guard/roles";
import { Roles } from "src/decorators/role";
import { AllProductsConfig } from "src/types/product";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get()
  async findAll(
    @Query("searchTerm") searchTerm?: string,
    @Query("sort") sorting?: string,
    @Query("currentMinPrice") currentMinPrice?: number,
    @Query("currentMaxPrice") currentMaxPrice?: number,
    @Query("selectedCategories") selectedCategories?: string,
    @Query("rating") rating?: number,
    @Query("isDiscount") isDiscount?: string,
    @Query("take") take?: number,
    @Query("skip") skip?: number,
  ) {
    let allProductsConfig: AllProductsConfig = {};
    if (sorting) {
      allProductsConfig = {
        searchTerm,
        sorting,
        currentMinPrice,
        currentMaxPrice,
        selectedCategories:
          selectedCategories === "" ? [] : selectedCategories.split(";"),
        rating,
        isDiscount: isDiscount === "true",
        skip,
        take,
      };
    }

    return this.productService.findAll(allProductsConfig);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get("by-id/:id")
  async findById(@Param("id") id: string) {
    return this.productService.findById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get("min-max")
  async findMinMaxPrice() {
    return this.productService.findMinMaxPrice();
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
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN")
  async create(@Body() dto: ProductCreateDTO) {
    return this.productService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(":id")
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN")
  async createDetails(@Param("id") id: string, @Body() dto: ProductUpdateDTO) {
    return this.productService.update(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(":id")
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN")
  async delete(@Param("id") id: string) {
    return this.productService.delete(id);
  }
}
