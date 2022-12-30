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
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsInt()
  @Min(1)
  quantity: number;
}

export class createOrderDto {
  @IsNumber()
  @IsNotEmpty({ message: 'customerId is not empty' })
  userId: number;

  @IsNumber()
  @IsOptional({ message: 'productId is not empty' })
  productId: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  products: createOrderProductDto[];
}
