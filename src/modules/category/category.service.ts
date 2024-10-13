import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryEntity: Repository<Category>,
  ) {}

  async createCategory() {
    const result = this.categoryEntity.create({
      title: 'category test',
      text: 'Test category',
      tasks: [],
    });
    await this.categoryEntity.save(result);
    return result;
  }
}
