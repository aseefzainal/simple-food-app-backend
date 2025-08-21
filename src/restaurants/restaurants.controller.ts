import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getRestaurants(@Query('q') query?: string) {
    if (query) {
      return this.restaurantsService.search(query);
    }
    return this.restaurantsService.findAll();
  }
}
