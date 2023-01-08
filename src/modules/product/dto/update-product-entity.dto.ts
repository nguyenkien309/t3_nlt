import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  Validate,
} from 'class-validator';

export class UpdateProductDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'name is not empty' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'description is not empty' })
  description: string;

  @ApiProperty()
  @IsOptional()
  product_image: string;

  @ApiProperty()
  @IsOptional()
  product_images?: string[];
}
