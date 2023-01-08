import { ProductEntity } from './entities/product.entity';
import { ProductController } from './product.controller';
import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { UploadService } from '../upload-file/upload-file.service';
import { UploadFileController } from '../upload-file/upload-file.controller';
import { UploadFileModule } from '../upload-file/upload-file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    UploadFileModule,
    CacheModule.register({
      ttl: 100000,
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService, UploadService],
  exports: [ProductService],
})
export class ProductModule {}
