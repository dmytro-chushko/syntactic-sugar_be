import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Proposal } from 'src/database/entities/proposalFreelancer.entity';
import { Repository } from 'typeorm';
import { CreateProposalDto } from 'src/modules/proposals/dtos/createProposal.dto';
import { IProposalsService } from 'src/modules/proposals/interfaces/IProposalsService';

@Injectable()
export class ProposalsService implements IProposalsService {
  constructor(
    @InjectRepository(Proposal) private readonly proposalRepository: Repository<Proposal>,
  ) {}

  async createProposalFreelancer(
    createProposalDto: CreateProposalDto,
    file: Express.Multer.File,
  ): Promise<Proposal> {
    try {
      const filePath = file.path;

      const proposal = await this.proposalRepository.save({
        ...createProposalDto,
        filePath: filePath,
      });

      return proposal;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
