import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Food } from '../foods/food.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  cuisine: string;

  @Column({ default: true })
  isOpen: boolean;

  @OneToMany(() => Food, (food) => food.restaurant)
  foods: Food[];
}
