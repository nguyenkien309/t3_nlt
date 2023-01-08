import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadService } from './upload-file.service';
import { Module } from '@nestjs/common';
import { UploadFileController } from './upload-file.controller';

@Module({
  controllers: [UploadFileController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadFileModule {}
