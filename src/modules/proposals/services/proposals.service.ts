import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Proposal } from 'src/database/entities/proposalFreelancer.entity';
import { Repository } from 'typeorm';
import { CreateProposalDto } from 'src/modules/proposals/dtos/createProposal.dto';
import { IProposalsService } from 'src/modules/proposals/interfaces/IProposalsService';
import { IJobsService } from 'src/modules/jobs/interfaces/IJobService';
import { Services } from 'src/utils/constants';
import { IFreelancerService } from 'src/modules/freelancer/interfaces/IFreelancerService';
import { User } from 'src/database/entities';

@Injectable()
export class ProposalsService implements IProposalsService {
  constructor(
    @InjectRepository(Proposal) private readonly proposalRepository: Repository<Proposal>,
    @Inject(Services.JOBS) private readonly jobService: IJobsService,
    @Inject(Services.FREELANCER) private readonly freelancerService: IFreelancerService,
  ) {}

  async createProposalFreelancer(
    user: User,
    createProposalDto: CreateProposalDto,
    file: Express.Multer.File,
  ): Promise<Proposal> {
    try {
      const filePath = file.path;
      const freelancer = await this.freelancerService.getProfile(user);
      const job = await this.jobService.getJobById(createProposalDto.id);

      const proposal = await this.proposalRepository.save({
        coverLetter: createProposalDto.coverLetter,
        hourRate: createProposalDto.hourRate,
        filePath: filePath,
        freelancer,
        job,
      });

      return proposal;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
