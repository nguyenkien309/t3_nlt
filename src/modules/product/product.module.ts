import { ProductEntity } from './entities/product.entity';
import { ProductController } from './product.controller';
import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { UploadService } from '../upload-file/upload-file.service';
import { UploadFileController } from '../upload-file/upload-file.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    CacheModule.register({
      ttl: 100000,
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService, UploadFileController, UploadService],
  exports: [ProductService],
})
export class ProductModule {}
