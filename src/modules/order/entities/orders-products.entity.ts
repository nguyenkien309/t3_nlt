import { DateAudit } from 'src/utils/entities/date_audit.entity';
import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { OrderEntity } from './order.entity';

@Entity({ name: 'orders-products' })
export class OrderProductEntity extends DateAudit {
  @PrimaryColumn()
  orderId: number;

  @ManyToOne(() => OrderEntity, (order) => order.OrderProducts)
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;

  @PrimaryColumn()
  productId: number;

  @ManyToOne(() => ProductEntity, (product) => product.OrderProducts)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  //   @Column()
  //   quantity: number;
}
