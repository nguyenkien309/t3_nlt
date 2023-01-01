import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  Validate,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'name is not empty' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'description is not empty' })
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'price is not empty' })
  price: number;

  @ApiProperty()
  @IsOptional()
  product_image: string;

  // @IsOptional()
  // product_images?: string[];
}
