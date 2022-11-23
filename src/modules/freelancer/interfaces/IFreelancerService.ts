import { CreateFreelancerDto } from 'src/modules/freelancer/dtos/CreateFreelancer.dto';

export interface IFreelancerService {
  createFreelancer(userId: string, createFreelancerDto: CreateFreelancerDto);
}
