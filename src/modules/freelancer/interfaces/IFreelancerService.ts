import { CreateFreelancerDto } from 'src/modules/freelancer/dtos/createFreelancer.dto';
import { IToken } from 'src/modules/auth/interfaces/IToken';
import { User } from 'src/database/entities/users.entity';
import { Freelancer } from 'src/database/entities/freelancer.entity';

export interface IFreelancerService {
  createFreelancer(user: User, createFreelancerDto: CreateFreelancerDto): Promise<IToken>;
  editPublished(user: User, publ: boolean): Promise<IToken>;
  getProfile(user: User): Promise<Freelancer>;
}
