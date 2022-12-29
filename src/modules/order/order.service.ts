import { UpdateOrderDto } from './dto/update-order.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, In, Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { createOrderDto } from './dto/create-order-dto';
import { OrderEntity } from './entities/order.entity';
import { OrderProductEntity } from './entities/orders-products.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private OrderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderProductEntity)
    private readonly ordersProductsRepository: Repository<OrderProductEntity>,
    private userService: UserService,
    private productService: ProductService,
  ) {}

  async create(userId: number, createOrderDto: createOrderDto) {
    const productsDto = createOrderDto.products;
    // createOrderDto.customerId = userId;
    const userExists = await this.userService.findOne(userId);

    const productsIds = productsDto.map((productId) => productId.id);
    const productsQTY = productsDto.map((productId) => productId.quantity);
    // const productsMap = this.createProductQuantityMap(productsDto);

    const products = await this.productService.findProductsByIds(productsIds);

    const createOrder = new OrderEntity(createOrderDto);
    createOrder.userId = userId;
    // const order = await this.OrderRepository.create({
    //   ...createOrderDto,
    //   userId,
    // });
    console.log('createOrderDto', createOrderDto);

    const saveOrder = await this.OrderRepository.save(createOrder);

    const orderProducts = products.map((product) => ({
      orderId: saveOrder.id,
      productId: product.id,
    }));
    await this.ordersProductsRepository.save(orderProducts);

    return { saveOrder, product: { orderProducts } };
  }

  async update(prdId: any, updateOrderDto: UpdateOrderDto) {
    const order = await this.OrderRepository.preload({
      id: prdId,
      ...updateOrderDto,
    });

    return this.OrderRepository.save(order);
  }

  async deleteOrderPrd(prdId: number) {
    return this.OrderRepository.manager.transaction(async (manager) => {
      const order = await manager.find(OrderEntity, {
        where: { id: prdId },
      });
      //   await order.save();
      await manager.delete(OrderProductEntity, { orderId: prdId });
    });
  }
}
