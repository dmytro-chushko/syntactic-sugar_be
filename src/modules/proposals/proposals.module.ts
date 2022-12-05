import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proposal } from 'src/database/entities/proposalFreelancer.entity';
import { Services } from 'src/utils/constants';
import { ProposalsController } from './controllers/proposals.controller';
import { ProposalsService } from './services/proposals.service';

@Module({
  imports: [TypeOrmModule.forFeature([Proposal])],
  controllers: [ProposalsController],
  providers: [
    {
      provide: Services.PROPOSAL,
      useClass: ProposalsService,
    },
  ],
})
export class ProposalsModule {}
