import { ProductSize } from "@prisma/client";
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  Max,
  Min,
  ValidateNested,
} from "class-validator";

export class ProductCreateDTO {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  isVisible: boolean;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  details: Omit<ProductSize, "id" | "productId">[];

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  imagePaths: string[];

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  categoryIds: string[];
}

export class ProductDetailsCreateDTO {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  details: Omit<ProductSize, "id" | "productId">[];
}

export class ProductImagesCreateDTO {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  imagePaths: string[];
}

export class ProductCategoryCreateDTO {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  categoryIds: string[];
}

export class ProductUpdateDTO extends ProductCreateDTO {
  @IsNumber()
  @Min(0)
  @Max(99)
  discountPercentage: number;
}
