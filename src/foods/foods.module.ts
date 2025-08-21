import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodsService } from './foods.service';
import { FoodsController } from './foods.controller';
import { Food } from './food.entity';
import { Restaurant } from '../restaurants/restaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Food, Restaurant])],
  providers: [FoodsService],
  controllers: [FoodsController],
})
export class FoodsModule {}
