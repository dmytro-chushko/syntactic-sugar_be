import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/category.entity';
import { Country } from 'src/database/entities/country.entity';
import { Job } from 'src/database/entities/jobs.entity';
import { Skill } from 'src/database/entities/skill.entity';
import { Services } from 'src/utils/constants';
import { JobsController } from './controllers/jobs.controller';
import { JobsService } from './services/jobs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Job, Skill, Country, Category])],
  controllers: [JobsController],
  providers: [{ provide: Services.JOBS, useClass: JobsService }],
})
export class JobsModule {}
