import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { ProductController } from './../product/product.controller';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  HttpCode,
  Post,
  UploadedFiles,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UploadService } from './upload-file.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { CreateProductDto } from '../product/dto/create-product-entity.dto';

@ApiTags('v1/upload-file')
@Controller('v1/upload-file')
export class UploadFileController {
  constructor(private readonly uploadService: UploadService) {}

  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.OK)
  @Post('/upload')
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.uploadService.createFile(file);
  }
}
