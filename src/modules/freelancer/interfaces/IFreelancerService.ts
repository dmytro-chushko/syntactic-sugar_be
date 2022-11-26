import { CreateFreelancerDto } from '../dtos/createFreelancer.dto';
import { IToken } from 'src/modules/auth/interfaces/IToken';

export interface IFreelancerService {
  createFreelancer(userId: string, createFreelancerDto: CreateFreelancerDto): Promise<IToken>;
  isEmployer(userId: string): Promise<boolean>;
}
