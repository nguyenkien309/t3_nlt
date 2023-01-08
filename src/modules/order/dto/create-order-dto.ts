import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
  Min,
  Validate,
  ValidateNested,
} from 'class-validator';

export class createOrderProductDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNumber()
  @IsInt()
  @Min(1)
  quantity: number;
}

export class createOrderDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'name is not empty' })
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'customerId is not empty' })
  userId: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional({ message: 'productId is not empty' })
  productId: number;

  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  products: createOrderProductDto[];
}
