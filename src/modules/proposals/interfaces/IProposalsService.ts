import { User } from 'index';
import { Proposal } from 'src/database/entities/proposalFreelancer.entity';
import { CreateProposalDto } from 'src/modules/proposals/dtos/createProposal.dto';

export interface IProposalsService {
  createProposalFreelancer(
    user: User,
    createProposalDto: CreateProposalDto,
    file: Express.Multer.File,
  ): Promise<Proposal>;
}
