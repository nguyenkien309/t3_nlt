import { IsString, IsOptional, IsEnum } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  status?: string;
}
