import { OrderService } from './order.service';
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
import { createOrderDto } from './dto/create-order-dto';
import { AuthUser } from 'src/decorator/auth.user.decorator';
import { AuthUserDto } from 'src/utils/types/i.auth.user';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('/v1/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/create')
  async create(
    @AuthUser() authUser: AuthUserDto,
    @Body() createOrderDto: createOrderDto,
  ) {
    return this.orderService.create(authUser.id, createOrderDto);
  }

  @Post('update/:id')
  async updateProduct(
    @Param('id') productId: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(productId, updateOrderDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') productId: number) {
    return this.orderService.deleteOrderPrd(productId);
  }
}
