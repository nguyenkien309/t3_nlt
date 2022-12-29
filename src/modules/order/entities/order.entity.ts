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
import { OrderProductEntity } from './orders-products.entity';

@Entity({ name: 'orders' })
export class OrderEntity extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  //   @Column()
  //   productId: number;

  //   @Column()
  //   quantity: number;

  //   @ManyToOne(() => UserEntity, (user) => user.order, { eager: true })
  //   user: UserEntity[];
  @Column({ name: 'status', default: 'pending', nullable: true })
  status: string;

  @OneToMany(() => OrderProductEntity, (OrderProducts) => OrderProducts.order)
  OrderProducts: OrderProductEntity[];

  constructor(partial: Partial<OrderEntity>) {
    super();
    Object.assign(this, partial);
  }
}
