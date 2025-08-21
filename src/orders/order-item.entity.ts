import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Food } from '../foods/food.entity';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Food, { eager: true })
  food: Food;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 8, scale: 2 })
  price: number;
}
