import { ProductEntity } from './entities/product.entity';
import { ProductController } from './product.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { UploadService } from '../upload-file/upload-file.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [ProductService, UploadService],
  exports: [ProductService],
})
export class ProductModule {}
