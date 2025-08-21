import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async createOrder(@Req() req, @Body() body: { restaurantId: number; items: { foodId: number; quantity: number }[] }) {
    return this.ordersService.createOrder(req.user.userId, body.restaurantId, body.items);
  }

  @Get()
  async getMyOrders(@Req() req) {
    return this.ordersService.findOrdersByUser(req.user.userId);
  }
}
