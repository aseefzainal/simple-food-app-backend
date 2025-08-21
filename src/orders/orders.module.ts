import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { Food } from '../foods/food.entity';
import { Restaurant } from '../restaurants/restaurant.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Food, Restaurant, User])],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
