import { UpdateProductDto } from './dto/update-product-entity.dto';
import { CreateProductDto } from './dto/create-product-entity.dto';
import { ProductEntity } from './entities/product.entity';
import { Injectable } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { InjectRepository } from '@nestjs/typeorm';
import { RegisterRequestDto } from '../auth/dto/register-request.dto';
import { UploadService } from '../upload-file/upload-file.service';
import { PaginationQueryDto } from 'src/utils/dto/paginate.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private ProductRepository: Repository<ProductEntity>,
    private readonly uploadService: UploadService,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
    file: Express.Multer.File,
  ) {
    const createproduct = new ProductEntity(createProductDto);
    if (file) {
      const filepath = await this.uploadService.createFile(file);
      createproduct.product_image = filepath;
    }

    await this.ProductRepository.save(createproduct);
    return this.ProductRepository.findBy({ id: createproduct.id });
  }

  async updateProduct(
    productId: number,
    updateProductDto: UpdateProductDto,
    file: Express.Multer.File,
  ) {
    const exist = await this.ProductRepository.findOne({
      where: { id: productId },
    });
    if (exist) {
      if (file) {
        const filepath = await this.uploadService.createFile(file);
        exist.product_image = filepath;
      }

      exist.name = updateProductDto.name;
      exist.description = updateProductDto.description;
      await this.ProductRepository.save(exist);
    }
    return exist;
  }

  async deleteProduct(productId: number) {
    return await this.ProductRepository.delete(productId);
  }

  async findProductsByIds(productIds: Array<string>) {
    const products = await this.ProductRepository.createQueryBuilder()
      .where('id IN(:...productIds)', { productIds })
      .getMany();

    return products;
  }

  async findProduct(productId) {
    return this.ProductRepository.find({ where: { id: productId } });
  }

  async getProductsPaginate(query: PaginationQueryDto) {
    const limit = query.limit ? query.limit : 5;
    const page = query.page ? query.page : 0;
    const keyword = query.keyword ? query.keyword : null;
    const qb = this.ProductRepository.createQueryBuilder('products');
    qb.andWhere('products.deleted = false');
    qb.skip(limit * page)
      .take(limit)
      .orderBy('products.price', 'DESC');
    if (keyword) {
      qb.andWhere('products.name LIKE :name', { name: `%${keyword}%` });
    }
    const [products, total] = await qb.getManyAndCount();

    return { total, products };
  }
}
