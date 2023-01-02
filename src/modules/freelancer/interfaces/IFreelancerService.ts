import { CreateFreelancerDto } from 'src/modules/freelancer/dtos/createFreelancer.dto';
import { User } from 'src/database/entities/users.entity';
import { Freelancer } from 'src/database/entities/freelancer.entity';
import { ITokenAndRole } from 'src/modules/auth/interfaces/ITokenAndRole';

export interface IFreelancerService {
  createFreelancer(user: User, createFreelancerDto: CreateFreelancerDto): Promise<ITokenAndRole>;
  editPublished(user: User, publ: boolean): Promise<string>;
  getProfile(user: User): Promise<Freelancer>;
  getById(id: string): Promise<Freelancer>;
}
