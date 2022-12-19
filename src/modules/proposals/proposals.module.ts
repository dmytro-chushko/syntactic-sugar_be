import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proposal } from 'src/database/entities/proposalFreelancer.entity';
import { Services } from 'src/utils/constants';
import { FreelancerModule } from 'src/modules/freelancer/freelancer.module';
import { JobsModule } from 'src/modules/jobs/jobs.module';
import { UserModule } from 'src/modules/user/user.module';
import { ProposalsController } from './controllers/proposals.controller';
import { ProposalsService } from './services/proposals.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Proposal]),
    JobsModule,
    FreelancerModule,
    UserModule,
    JwtModule,
  ],
  controllers: [ProposalsController],
  providers: [
    {
      provide: Services.PROPOSAL,
      useClass: ProposalsService,
    },
  ],
})
export class ProposalsModule {}
