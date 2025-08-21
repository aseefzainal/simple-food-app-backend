import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('foods')
export class FoodsController {
  constructor(private foodsService: FoodsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getFoods(@Query('q') query?: string) {
    if (query) {
      return this.foodsService.search(query);
    }
    return this.foodsService.findAll();
  }
}
