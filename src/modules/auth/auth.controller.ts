import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';
import { UserEntity } from './../user/entities/user.entity';
import { RegisterRequestDto } from './dto/register-request.dto';

import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Param,
  BadRequestException,
  CacheInterceptor,
  Query,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { LoginRequestDto } from './dto/login-request.dto';
import { AuthUser } from 'src/decorator/auth.user.decorator';

@ApiTags('v1/auth')
@Controller('v1/auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() request: LoginRequestDto) {
    const data = await this.authService.login(request);
    return data;
  }

  @HttpCode(HttpStatus.OK)
  @Post('/register')
  async register(@Body() registerRequestDto: RegisterRequestDto) {
    const user = await this.userService.register(registerRequestDto);

    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Get('/redis-token')
  async redisLogin() {
    const data = await this.authService.getRedisLoginToken();
    return data;
  }
}
