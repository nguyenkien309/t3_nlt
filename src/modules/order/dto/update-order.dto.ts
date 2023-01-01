import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty()
  @IsOptional()
  status?: string;
}
