import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployerController } from './controllers/employer.controller';
import { Employer } from 'src/database/entities/employer.entity';
import { EmployerService } from 'src/modules/employer/services/employer.service';
import { Services } from 'src/utils/constants';

@Module({
  controllers: [EmployerController],
  providers: [{ provide: Services.EMPLOYER, useClass: EmployerService }],
  imports: [TypeOrmModule.forFeature([Employer])],
  exports: [
    {
      provide: Services.EMPLOYER,
      useClass: EmployerService,
    },
  ],
})
export class EmployerModule {}
