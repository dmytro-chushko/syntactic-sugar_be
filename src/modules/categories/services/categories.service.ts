import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from 'src/modules/categories/dto/createCategoryDto';
import { ICategoriesService } from 'src/modules/categories/interfaces/ICategoriesService';

@Injectable()
export class CategoriesService implements ICategoriesService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);

    return await this.categoryRepository.save(category);
  }

  async getCategoryByName(name: string): Promise<Category> {
    return await this.categoryRepository.findOneBy({ name });
  }
}
