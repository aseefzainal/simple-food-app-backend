import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { Food } from '../foods/food.entity';
import { Restaurant } from '../restaurants/restaurant.entity';
import { User } from '../users/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Food) private foodRepo: Repository<Food>,
    @InjectRepository(Restaurant) private restaurantRepo: Repository<Restaurant>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async createOrder(userId: number, restaurantId: number, items: { foodId: number; quantity: number }[]) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const restaurant = await this.restaurantRepo.findOne({ where: { id: restaurantId } });
    if (!restaurant) throw new NotFoundException('Restaurant not found');

    let total = 0;
    const orderItems: OrderItem[] = [];

    for (const item of items) {
      const food = await this.foodRepo.findOne({ where: { id: item.foodId } });
      if (!food) throw new NotFoundException(`Food with ID ${item.foodId} not found`);

      const price = Number(food.price) * item.quantity;
      total += price;

      const orderItem = this.orderItemRepo.create({
        food,
        quantity: item.quantity,
        price,
      });

      orderItems.push(orderItem);
    }

    const order = this.orderRepo.create({
      user,
      restaurant,
      items: orderItems,
      total,
      status: 'pending',
    });

    return this.orderRepo.save(order);
  }

  async findOrdersByUser(userId: number) {
    return this.orderRepo.find({ where: { user: { id: userId } }, order: { createdAt: 'DESC' } });
  }
}
