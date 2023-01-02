import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invitation } from 'src/database/entities';
import { Services } from 'src/utils/constants';
import { EmployerModule } from 'src/modules/employer/employer.module';
import { FreelancerModule } from 'src/modules/freelancer/freelancer.module';
import { JobsModule } from 'src/modules/jobs/jobs.module';
import { UserModule } from 'src/modules/user/user.module';
import { InvitationService } from './services/invitation.service';
import { InvitationController } from './controllers/invitation.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invitation]),
    JobsModule,
    FreelancerModule,
    EmployerModule,
    UserModule,
    JwtModule,
  ],
  controllers: [InvitationController],
  providers: [
    {
      provide: Services.INVITATION,
      useClass: InvitationService,
    },
  ],
})
export class InvitationModule {}
