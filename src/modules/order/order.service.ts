import { UpdateOrderDto } from './dto/update-order.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, In, Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { createOrderDto, createOrderProductDto } from './dto/create-order-dto';
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
    const userExists = await this.userService.findOne(userId);

    const productsIds = productsDto.map((productId) => productId.id);
    const productQTY = productsDto.map((productId) => productId.quantity);
    const productList = this.getQtyProductById(productsDto);
    const getAll = productsDto.map((productId) => productId);
    const totalPrice = productQTY.reduce((a, b) => a + b);
    console.log('totalPrice', totalPrice);

    const products = await this.productService.findProductsByIds(productsIds);

    const createOrder = new OrderEntity(createOrderDto);
    createOrder.userId = userId;
    createOrder.totalPrice = totalPrice;
    console.log('createOrderDto', createOrderDto);

    const saveOrder = await this.OrderRepository.save(createOrder);
    const orderProducts = await products.map((product) => ({
      orderId: saveOrder.id,
      productId: product.id,
      product_image: product.product_image,
      quantity: productList.get(product.id),
    }));

    await this.ordersProductsRepository.save(orderProducts);

    return { userId, orderProducts };
  }

  private getQtyProductById(productsDto: Array<createOrderProductDto>) {
    const listProducts = new Map();

    for (const product of productsDto) {
      const { id, quantity } = product;

      listProducts.set(id, quantity);
    }

    return listProducts;
  }

  async update(orderId: number, updateOrderDto: UpdateOrderDto) {
    const exist = this.OrderRepository.findOne({ where: { id: orderId } });

    return await this.OrderRepository.update(orderId, {
      status: updateOrderDto.status,
    });
  }

  async deleteOrderPrd(prdId: number): Promise<void> {
    return this.OrderRepository.manager.transaction(async (manager) => {
      await manager.delete(OrderEntity, { id: prdId });
      await manager.delete(OrderProductEntity, { orderId: prdId });
    });
    // await this.ordersProductsRepository.delete({ orderId: prdId });
  }
}
