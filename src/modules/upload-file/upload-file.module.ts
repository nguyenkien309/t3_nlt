import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadService } from './upload-file.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadFileModule {}
