import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/category.entity';
import { Job } from 'src/database/entities/jobs.entity';
import { Services } from 'src/utils/constants';
import { CategoriesService } from './services/categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Job])],
  exports: [{ provide: Services.CATEGORIES, useClass: CategoriesService }],
  providers: [{ provide: Services.CATEGORIES, useClass: CategoriesService }],
})
export class CategoriesModule {}
