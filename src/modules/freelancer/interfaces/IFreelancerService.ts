import { CreateFreelancerDto } from 'src/modules/freelancer/dtos/createFreelancer.dto';
import { IToken } from 'src/modules/auth/interfaces/IToken';
import { User } from 'src/database/entities/users.entity';

export interface IFreelancerService {
  createFreelancer(user: User, createFreelancerDto: CreateFreelancerDto): Promise<IToken>;
  isEmployer(user: User): Promise<boolean>;
  editPublished(user: User, publ: boolean): Promise<IToken>;
  createImage(image): Promise<string>;
}
