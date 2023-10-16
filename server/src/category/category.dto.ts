import { IsString } from "class-validator";

export class CategoryCreateDTO {
  @IsString()
  name: string;

  @IsString()
  slug: string;
}

export class CategoryUpdateDTO extends CategoryCreateDTO {}
