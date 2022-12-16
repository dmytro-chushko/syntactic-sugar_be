import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Services } from 'src/utils/constants';
import { JobsController } from 'src/modules/jobs/controllers/jobs.controller';
import { JobsService } from './services/jobs.service';
import { CategoriesModule } from 'src/modules/categories/categories.module';
import { SkillsModule } from 'src/modules/skills/skills.module';
import { CountriesModule } from 'src/modules/countries/countries.module';
import { EmployerModule } from 'src/modules/employer/employer.module';
import { UserModule } from 'src/modules/user/user.module';
import { User, Job, Employer, Skill, Country, Category } from 'src/database/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Job, User, Employer, Skill, Country, Category]),
    CategoriesModule,
    SkillsModule,
    CountriesModule,
    EmployerModule,
    UserModule,
    JwtModule,
  ],
  controllers: [JobsController],
  providers: [{ provide: Services.JOBS, useClass: JobsService }],
})
export class JobsModule {}
