import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Food } from './food.entity';
import { Restaurant } from '../restaurants/restaurant.entity';
import { faker } from '@faker-js/faker/locale/en_US';

@Injectable()
export class FoodsService implements OnModuleInit {
  constructor(
    @InjectRepository(Food)
    private foodRepo: Repository<Food>,
    @InjectRepository(Restaurant)
    private restaurantRepo: Repository<Restaurant>,
  ) {}

  async onModuleInit() {
    const count = await this.foodRepo.count();
    if (count === 0) {
      const restaurants = await this.restaurantRepo.find();
      for (const restaurant of restaurants) {
        for (let i = 0; i < 5; i++) {
          const food = this.foodRepo.create({
            name: faker.helpers.arrayElement([
              'Nasi Lemak',
              'Roti Canai',
              'Char Kway Teow',
              'Laksa',
              'Mee Goreng',
              'Ayam Goreng',
              'Satay',
              'Maggi Goreng',
              'Nasi Kandar',
              'Teh Tarik',
            ]),
            price: faker.number.float({ min: 5, max: 30, multipleOf: 0.5 }),

            isAvailable: faker.datatype.boolean(),
            restaurant,
          });
          await this.foodRepo.save(food);
        }
      }
      console.log('✅ Seeded foods into database');
    }
  }

  findAll() {
    return this.foodRepo.find({ relations: ['restaurant'] });
  }

  search(query: string) {
    return this.foodRepo.find({
      where: [{ name: ILike(`%${query}%`) }],
      relations: ['restaurant'],
    });
  }
}
