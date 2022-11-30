import {
  ConflictException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { IFreelancerService } from 'src/modules/freelancer/interfaces/IFreelancerService';
import { InjectRepository } from '@nestjs/typeorm';
import { Freelancer } from 'src/database/entities/freelancer.entity';
import { CreateFreelancerDto } from 'src/modules/freelancer/dtos/createFreelancer.dto';
import { Services, UserRoles } from 'src/utils/constants';
import { ITokenService } from 'src/modules/auth/interfaces/ITokenService';
import { IUserService } from 'src/modules/user/interfaces/IUserService';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/users.entity';
import { IEmployerService } from '../../employer/interfaces/IEmployerService';

@Injectable()
export class FreelancerService implements IFreelancerService {
  constructor(
    @InjectRepository(Freelancer) private readonly freelancerRepository: Repository<Freelancer>,
    @Inject(Services.USER) private readonly userService: IUserService,
    @Inject(Services.TOKEN) private readonly tokenService: ITokenService,
    @Inject(forwardRef(() => Services.EMPLOYER))
    private readonly employerService: IEmployerService,
  ) {}

  async createFreelancer(
    user: User,
    createFreelancerDto: CreateFreelancerDto,
  ): Promise<Freelancer> {
    try {
      const isEmployer = await this.employerService.findEmployer(user);
      if (isEmployer) {
        throw new ConflictException();
      }
      const freelancer = this.freelancerRepository.create({
        fullName: createFreelancerDto.fullName,
        category: createFreelancerDto.category,
        country: createFreelancerDto.country,
        hourRate: createFreelancerDto.hourRate,
        position: createFreelancerDto.position,
        availableAmountOfHours: createFreelancerDto.availableAmountOfHours,
        employmentType: createFreelancerDto.employmentType,
        workExperience: createFreelancerDto.workExperience,
        englishLevel: createFreelancerDto.englishLevel,
        skills: createFreelancerDto.skills,
        user: user,
      });
      await this.freelancerRepository.save(freelancer);
      await this.userService.changeRole(user, UserRoles.FREELANCER);

      return freelancer;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findFreelancer(user: User): Promise<Freelancer | null> {
    const freelancer = await this.freelancerRepository.findOneBy({ user: user });

    return freelancer || null;
  }

  async editPublished(user: User, publ: boolean): Promise<Freelancer | null> {
    const freelancer = await this.freelancerRepository.findOneBy({ user: user });
    freelancer.isPublished = publ;
    await this.freelancerRepository.save(freelancer);

    return freelancer || null;
  }
}
