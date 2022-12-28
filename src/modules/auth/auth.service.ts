// import { CreateUserDto } from './../user/dto/create-user.dto';
import {
  JWT_EXPIRES_IN,
  JWT_REFESH_EXPIRES_IN,
  JWT_SECRET_KEY,
  JWT_SECRET_REFESH_KEY,
} from './../../config/config';
import { UserService } from 'src/modules/user/user.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';
import { EntityId } from 'typeorm/repository/EntityId';
import * as bcrypt from 'bcrypt';
import { AuthUserDto } from 'src/utils/types/i.auth.user';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return false;
    }
    const compareResult = await bcrypt.compare(password, user.password);
    if (!compareResult) {
      return false;
    }
    return user;
  }

  async login(request: LoginRequestDto): Promise<any> {
    const user = await this.userService.findByEmail(request.email);
    if (!user) {
      return false;
    }
    const compareResult = await bcrypt.compare(request.password, user.password);
    if (!compareResult) {
      return false;
    }

    const payload: AuthUserDto = {
      email: user.email,
      id: user.id,
    };
    const token = await this.createToken(payload);

    return { ...user, token };
  }

  async createToken(payload: AuthUserDto) {
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
    };
  }
}
