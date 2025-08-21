import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Restaurant } from '../restaurants/restaurant.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToOne(() => Restaurant, { eager: true })
  restaurant: Restaurant;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true, eager: true })
  items: OrderItem[];

  @Column('decimal', { precision: 8, scale: 2 })
  total: number;

  @Column({ default: 'pending' })
  status: string; // pending, confirmed, delivered, cancelled

  @CreateDateColumn()
  createdAt: Date;
}
