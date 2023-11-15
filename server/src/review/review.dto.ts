import { IsNumber, IsString, Max, Min } from "class-validator";

export class ReviewCreateDTO {
  @IsString()
  text: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @IsString()
  userId: string;

  @IsString()
  productId: string;
}

export class ReviewUpdateDTO {
  @IsString()
  text: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;
}
