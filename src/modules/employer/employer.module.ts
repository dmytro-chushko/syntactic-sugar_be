import { forwardRef, Module } from '@nestjs/common';
import { EmployerController } from './controllers/employer.controller';
import { EmployerService } from './services/employer.service';
import { Services } from '../../utils/constants';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Employer } from '../../database/entities/employer.entity';
import { FreelancerModule } from '../freelancer/freelancer.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    UserModule,
    forwardRef(() => FreelancerModule),
    TypeOrmModule.forFeature([Employer]),
  ],
  controllers: [EmployerController],
  providers: [
    {
      provide: Services.EMPLOYER,
      useClass: EmployerService,
    },
    JwtService,
  ],
  exports: [
    {
      provide: Services.EMPLOYER,
      useClass: EmployerService,
    },
  ],
})
export class EmployerModule {}
