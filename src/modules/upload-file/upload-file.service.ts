import { UserEntity } from './../user/entities/user.entity';
import { AuthUser } from './../../decorator/auth.user.decorator';
import { UserService } from 'src/modules/user/user.service';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { DataSource, UpdateResult } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { cloudinary } from 'src/utils/cloudinary';

@Injectable()
export class UploadService {
  async createFile(file: Express.Multer.File) {
    try {
      console.log(file);

      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '../static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);

      return this.uploadToCloudinary(filePath, fileName);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async uploadToCloudinary(filePath: string, fileName: string) {
    try {
      const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      };
      const image = await cloudinary.uploader.upload(
        `${filePath}/${fileName}`,
        options,
      );

      return image.url;
    } catch (e) {
      console.log(e);
    }
  }
}
