import {
  BadRequestException,
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
import { Category } from '../../../database/entities/category.entity';
import { Skill } from '../../../database/entities/skill.entity';

@Injectable()
export class FreelancerService implements IFreelancerService {
  constructor(
    @InjectRepository(Freelancer) private readonly freelancerRepository: Repository<Freelancer>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Skill) private readonly skillRepository: Repository<Skill>,
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
      const category = await this.categoryRepository
        .createQueryBuilder('category')
        .where('category.name = :name', { name: createFreelancerDto.category })
        .getOne();

      const skills = await Promise.all(
        createFreelancerDto.skills.map(async skill => {
          skill = await this.skillRepository
            .createQueryBuilder('skill')
            .where('skill.name = :name', { name: skill.name })
            .getOne();
          if (!skill) {
            throw new BadRequestException();
          }

          return skill;
        }),
      );

      const freelancer = this.freelancerRepository.create({
        fullName: createFreelancerDto.fullName,
        category: category,
        country: createFreelancerDto.country,
        hourRate: createFreelancerDto.hourRate,
        position: createFreelancerDto.position,
        availableAmountOfHours: createFreelancerDto.availableAmountOfHours,
        employmentType: createFreelancerDto.employmentType,
        workExperience: createFreelancerDto.workExperience,
        englishLevel: createFreelancerDto.englishLevel,
        education: createFreelancerDto.education,
        workHistory: createFreelancerDto.workHistory,
        otherExperience: createFreelancerDto.otherExperience,
        skills: skills,
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
}
