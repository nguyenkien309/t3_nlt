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

export class ProductDto {
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsInt()
  @Min(1)
  quantity: number;
}

export class createOrderDto {
  @IsNotEmpty({ message: 'customerId is not empty' })
  userId: number;

  @IsOptional({ message: 'productId is not empty' })
  productId: number;

  @IsNotEmpty()
  quantity: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  products: ProductDto[];
}
