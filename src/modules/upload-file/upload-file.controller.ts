import { ApiTags } from '@nestjs/swagger';
import { AuthUser } from './../../decorator/auth.user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { UploadService } from './upload-file.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  Res,
  UseInterceptors,
  UploadedFile,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('v1/upload-file')
@Controller('/v1/upload-file')
export class UploadFileController {
  constructor(private readonly uploadService: UploadService) {}

  // @UseGuards(JwtAuthGuard)
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.createFile(file);
  }
}
