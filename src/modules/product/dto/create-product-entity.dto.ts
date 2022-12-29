import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  Validate,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'name is not empty' })
  name: string;

  @IsNotEmpty({ message: 'description is not empty' })
  description: string;

  @IsNotEmpty({ message: 'price is not empty' })
  price: number;

  @IsOptional()
  product_image: string;

  // @IsOptional()
  // product_images?: string[];
}
