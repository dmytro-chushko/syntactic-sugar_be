import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployerController } from './controllers/employer.controller';
import { Employer } from 'src/database/entities/employer.entity';
import { EmployerService } from 'src/modules/employer/services/employer.service';
import { MailModule } from 'src/modules/mail/mail.module';
import { UserModule } from 'src/modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { Services } from 'src/utils/constants';

@Module({
  imports: [
    UserModule,
    MailModule,
    TypeOrmModule.forFeature([Employer]),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
  ],
  exports: [
    {
      provide: Services.EMPLOYER,
      useClass: EmployerService,
    },
  ],
  controllers: [EmployerController],
  providers: [{ provide: Services.EMPLOYER, useClass: EmployerService }],
})
export class EmployerModule {}
