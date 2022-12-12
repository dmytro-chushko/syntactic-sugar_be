import { Category } from 'src/database/entities/category.entity';
import { CreateCategoryDto } from 'src/modules/categories/dto/createCategoryDto';

export interface ICategoriesService {
  createCategory(createCategoryDto: CreateCategoryDto): Promise<Category>;
  getCategoryByName(name: string): Promise<Category>;
}
