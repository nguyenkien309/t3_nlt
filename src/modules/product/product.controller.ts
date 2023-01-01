import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from 'src/modules/user/user.service';
import {
  Controller,
  UseGuards,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product-entity.dto';
import { AuthUserDto } from 'src/utils/types/i.auth.user';
import { AuthUser } from 'src/decorator/auth.user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProductDto } from './dto/update-product-entity.dto';

@ApiTags('v1/product')
@Controller('v1/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //   @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('product_image'))
  @HttpCode(HttpStatus.OK)
  @Post('/create')
  async create(
    // @AuthUser() authUser: AuthUserDto,
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.productService.createProduct(createProductDto, file);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('/update/:id')
  async updateProduct(
    @Param('id') productId: number,
    @Body() updateproductDto: UpdateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.productService.updateProduct(
      productId,
      updateproductDto,
      file,
    );
  }

  @Delete(':id')
  async deleteProduct(@Param('id') productId: number) {
    return await this.productService.deleteProduct(productId);
  }
}
