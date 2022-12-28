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

@Entity({ name: 'products' })
export class ProductEntity extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({
    name: 'product_image',
    default: '',
  })
  product_image: string;

  // @Column({ type: 'text', array: true, default: [] })
  // product_images: string[];

  // @Column('text', { array: true })
  // test: string[];

  // @Column({
  //   name: 'product_images',
  //   default: '',
  // })
  // product_images: string[];

  constructor(partial: Partial<ProductEntity>) {
    super();
    Object.assign(this, partial);
  }
}
