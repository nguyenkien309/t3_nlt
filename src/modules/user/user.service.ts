import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { DataSource } from 'typeorm';
import { Repository, Like } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
// import { UploadService } from '../upload-file/upload-file.service';
import * as bcrypt from 'bcrypt';

import { InjectRepository } from '@nestjs/typeorm';
import { RegisterRequestDto } from '../auth/dto/register-request.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
  ) {}

  findByEmail(email: string) {
    return this.UserRepository.findOne({ where: { email: email } });
  }

  register(request: RegisterRequestDto) {
    return this.UserRepository.save(request);
  }
}
