import {
  ConflictException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Services, UserRoles } from 'src/utils/constants';
import { IUserService } from 'src/modules/user/interfaces/IUserService';
import { InjectRepository } from '@nestjs/typeorm';
import { Employer } from 'src/database/entities/employer.entity';
import { Repository } from 'typeorm';
import { IEmployerService } from 'src/modules/employer/interfaces/IEmployerService';
import { CreateEmployerDto } from 'src/modules/employer/dtos/createEmployer.dto';
import { User } from '../../../database/entities/users.entity';
import { ITokenService } from '../../auth/interfaces/ITokenService';
import { IFreelancerService } from '../../freelancer/interfaces/IFreelancerService';

@Injectable()
export class EmployerService implements IEmployerService {
  constructor(
    @Inject(Services.USER) private readonly userService: IUserService,
    @Inject(Services.TOKEN) private readonly tokenService: ITokenService,

    @Inject(forwardRef(() => Services.FREELANCER))
    private readonly freelancerService: IFreelancerService,
    @InjectRepository(Employer)
    private readonly employerRepository: Repository<Employer>,
  ) {}

  async createEmployer(user: User, createEmployerDto: CreateEmployerDto): Promise<Employer> {
    try {
      const isFreelancer = await this.freelancerService.findFreelancer(user);
      if (isFreelancer) {
        throw new ConflictException();
      }
      const employer = this.employerRepository.create({
        fullName: createEmployerDto.fullName,
        companyName: createEmployerDto.companyName,
        position: createEmployerDto.position,
        phone: createEmployerDto.phone,
        linkedIn: createEmployerDto.linkedIn,
        website: createEmployerDto.website,
        aboutUs: createEmployerDto.aboutUs,
        user: user,
      });
      await this.employerRepository.save(employer);
      await this.userService.changeRole(user, UserRoles.EMPLOYER);

      return employer;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findEmployer(user: User): Promise<Employer | null> {
    const employer = await this.employerRepository.findOneBy({ user: user });

    return employer || null;
  }
}
