import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { IFreelancerService } from 'src/modules/freelancer/interfaces/IFreelancerService';
import { CreateFreelancerDto } from 'src/modules/freelancer/dtos/CreateFreelancer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Freelancer } from 'src/database/entities/freelancer.entity';
import { Repository } from 'typeorm';
import { Services } from 'src/utils/constants';
import { IUserService } from 'src/modules/user/interfaces/IUserService';
import { ITokenService } from 'src/modules/auth/interfaces/ITokenService';
import { UserRole } from 'src/database/entities/users.entity';

@Injectable()
export class FreelancerService implements IFreelancerService {
  constructor(
    @InjectRepository(Freelancer)
    private readonly freelancerRepository: Repository<Freelancer>,
    @Inject(Services.USER) private readonly userService: IUserService,
    @Inject(Services.TOKEN) private readonly tokenService: ITokenService,
  ) {}

  async createFreelancer(
    userId: string,
    createFreelancerDto: CreateFreelancerDto,
  ) {
    try {
      const user = await this.userService.getUserById(userId);
      if (!user) {
        throw new BadRequestException();
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
      user.role = UserRole.Freelancer;

      return await this.tokenService.generateJwtToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
