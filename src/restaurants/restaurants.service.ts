import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { faker } from '@faker-js/faker/locale/en_US';

@Injectable()
export class RestaurantsService implements OnModuleInit {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepo: Repository<Restaurant>,
  ) {}

  async onModuleInit() {
    const count = await this.restaurantRepo.count();
    if (count === 0) {
      const malaysianCuisines = [
        'Malay',
        'Chinese',
        'Indian',
        'Mamak',
        'Nyonya',
        'Thai',
        'Western',
        'Seafood',
      ];

      for (let i = 0; i < 10; i++) {
        const restaurant = this.restaurantRepo.create({
          name: faker.company.name(),
          address: faker.location.streetAddress(),
          city: faker.location.city(),
          cuisine: faker.helpers.arrayElement(malaysianCuisines),
          isOpen: faker.datatype.boolean(),
        });
        await this.restaurantRepo.save(restaurant);
      }
      console.log('✅ Seeded restaurants into database');
    }
  }

  findAll() {
    return this.restaurantRepo.find();
  }

  search(query: string) {
    return this.restaurantRepo.find({
      where: [
        { name: ILike(`%${query}%`) },
        { city: ILike(`%${query}%`) },
        // { cuisine: ILike(`%${query}%`) },
      ],
    });
  }
}
