import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  Validate,
} from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty({ message: 'name is not empty' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'email is not empty' })
  @IsEmail(undefined, { message: 'email invalid' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'password is not empty' })
  @Length(8, 24, { message: 'password invalid' })
  password: string;
}
