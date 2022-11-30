import { Module } from '@nestjs/common';
import { JobController } from './controllers/job.controller';
import { JobService } from './services/job.service';
import { Services } from '../../utils/constants';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employer } from '../../database/entities/employer.entity';
import { Job } from '../../database/entities/job.entity';
import { EmployerModule } from '../employer/employer.module';

@Module({
  imports: [AuthModule, UserModule, EmployerModule, TypeOrmModule.forFeature([Employer, Job])],
  controllers: [JobController],
  providers: [
    {
      provide: Services.JOB_SERVICES,
      useClass: JobService,
    },
  ],
})
export class JobModule {}
