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

@Entity({ name: 'users' })
export class UserEntity extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'email', type: 'varchar', nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({
    name: 'avatar',
    default:
      'https://firebasestorage.googleapis.com/v0/b/post-images-storage.appspot.com/o/%2Fposts%2Fsquare_avatar.png?alt=media&token=1bf5a1c9-9691-45dc-bd26-b2d1753f7c53',
  })
  avatar: string;

  @Column({ name: 'role', type: 'varchar', default: 'user' })
  role: string;

  @Column({ default: true, nullable: true })
  isActive: boolean;

  // constructor(partial: Partial<UserEntity>) {
  //   super();
  //   Object.assign(this, partial);
  // }
}
