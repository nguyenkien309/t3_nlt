import {
  Controller,
  HttpCode,
  Post,
  UploadedFiles,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UploadService } from './upload-file.service';

@ApiTags('v1/upload-file')
@Controller('v1/upload-file')
export class UploadFileController {
  constructor(private readonly uploadService: UploadService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/upload-file')
  async uploadFile(@UploadedFiles() file: Express.Multer.File) {
    return await this.uploadService.createFile(file);
  }
}
