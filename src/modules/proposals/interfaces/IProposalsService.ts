import { User } from 'src/database/entities';
import { Proposal } from 'src/database/entities/proposalFreelancer.entity';
import { CreateProposalDto } from 'src/modules/proposals/dtos/createProposal.dto';

export interface IProposalsService {
  createProposalFreelancer(
    user: User,
    createProposalDto: CreateProposalDto,
    file: Express.Multer.File,
  ): Promise<Proposal>;
  getProposalsByJobId(user: User, id: string): Promise<Proposal[]>;
}
