import { IsString, IsBoolean } from "class-validator";

export class CategoryCreateDTO {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsBoolean()
  isVisible: boolean;
}

export class CategoryUpdateDTO extends CategoryCreateDTO {}
