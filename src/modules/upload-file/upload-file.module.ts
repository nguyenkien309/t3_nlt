import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadService } from './upload-file.service';
import { Module } from '@nestjs/common';
import { UploadFileController } from './upload-file.controller';
import { ProductModule } from '../product/product.module';
import { ProductController } from '../product/product.controller';
import { ProductService } from '../product/product.service';
import { ProductEntity } from '../product/entities/product.entity';

@Module({
  controllers: [UploadFileController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadFileModule {}
