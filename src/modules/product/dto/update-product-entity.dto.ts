import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  Validate,
} from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty({ message: 'name is not empty' })
  name: string;

  @IsNotEmpty({ message: 'description is not empty' })
  description: string;

  @IsOptional()
  product_image: string;

  @IsOptional()
  product_images?: string[];
}
