import { UserEntity } from './../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { DateAudit } from 'src/utils/entities/date_audit.entity';
import { OrderProductEntity } from 'src/modules/order/entities/orders-products.entity';

@Entity({ name: 'products' })
export class ProductEntity extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'price', nullable: true })
  price: number;

  @Column({
    name: 'product_image',
    default: '',
  })
  product_image: string;

  @OneToMany(() => OrderProductEntity, (OrderProducts) => OrderProducts.product)
  OrderProducts: OrderProductEntity[];

  constructor(partial: Partial<ProductEntity>) {
    super();
    Object.assign(this, partial);
  }
}
