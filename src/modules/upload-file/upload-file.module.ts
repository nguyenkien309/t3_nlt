import { UserEntity } from './../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/modules/user/user.service';
import { UploadService } from './upload-file.service';
import { Module } from '@nestjs/common';
import { UploadFileController } from './upload-file.controller';

@Module({
  controllers: [UploadFileController],
  providers: [UploadService],
})
export class UploadFileModule {}
