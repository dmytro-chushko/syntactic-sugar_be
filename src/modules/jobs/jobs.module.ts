import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/category.entity';
import { Country } from 'src/database/entities/country.entity';
import { Job } from 'src/database/entities/job.entity';
import { Skill } from 'src/database/entities/skill.entity';
import { Services } from 'src/utils/constants';
import { JobsController } from './controllers/jobs.controller';
import { JobService } from './services/jobs.service';
import { Employer } from 'src/database/entities/employer.entity';
import { EmployerModule } from 'src/modules/employer/employer.module';
import { UserModule } from 'src/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    EmployerModule,
    UserModule,
    JwtModule,
    TypeOrmModule.forFeature([Job, Skill, Country, Category, Employer]),
  ],
  controllers: [JobsController],
  providers: [{ provide: Services.JOBS, useClass: JobService }],
})
export class JobsModule {}
