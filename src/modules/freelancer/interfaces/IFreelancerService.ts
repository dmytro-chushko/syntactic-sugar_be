import { CreateFreelancerDto } from '../dtos/createFreelancer.dto';
import { User } from 'src/database/entities/users.entity';
import { Freelancer } from 'src/database/entities/freelancer.entity';

export interface IFreelancerService {
  createFreelancer(user: User, createFreelancerDto: CreateFreelancerDto): Promise<Freelancer>;
  findFreelancer(user: User): Promise<Freelancer | null>;
}
