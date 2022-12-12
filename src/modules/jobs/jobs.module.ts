import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/category.entity';
import { Country } from 'src/database/entities/country.entity';
import { Job } from 'src/database/entities/jobs.entity';
import { Skill } from 'src/database/entities/skill.entity';
import { Services } from 'src/utils/constants';
import { JobsController } from 'src/modules/jobs/controllers/jobs.controller';
import { JobsService } from './services/jobs.service';
import { CategoriesModule } from 'src/modules/categories/categories.module';
import { SkillsModule } from 'src/modules/skills/skills.module';
import { CountriesModule } from 'src/modules/countries/countries.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Job, Skill, Country, Category]),
    CategoriesModule,
    SkillsModule,
    CountriesModule,
  ],
  controllers: [JobsController],
  providers: [{ provide: Services.JOBS, useClass: JobsService }],
})
export class JobsModule {}
