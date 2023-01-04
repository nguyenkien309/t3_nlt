import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from 'src/modules/user/user.service';
import {
  Controller,
  CACHE_MANAGER,
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
  CacheInterceptor,
  Inject,
  Query,
} from '@nestjs/common';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product-entity.dto';
import { AuthUserDto } from 'src/utils/types/i.auth.user';
import { AuthUser } from 'src/decorator/auth.user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProductDto } from './dto/update-product-entity.dto';
import { Cache } from 'cache-manager';
import { PaginationQueryDto } from 'src/utils/dto/paginate.dto';

@ApiTags('v1/product')
@Controller('v1/product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

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

  @HttpCode(HttpStatus.OK)
  @Post(':id/cache')
  @UseInterceptors(CacheInterceptor)
  async loginCache(@Param('id') productId: number) {
    console.log('RUN HERE');
    return await this.productService.findProduct(productId);
  }

  @Get(':id/set-cache/test')
  async setCachePrd(@Param('id') productId: number) {
    const prd = await this.productService.findProduct(productId);
    await this.cacheManager.set('product', prd, { ttl: 60 * 10 });
    return true;
  }

  @Get(':id/get-cache/test')
  async getCachePrd(@Param('id') productId: number) {
    return this.cacheManager.get('product');
  }

  @Get('list-product')
  async listProductsPaginate(@Query() query: PaginationQueryDto) {
    return this.productService.getProductsPaginate(query);
  }
}
