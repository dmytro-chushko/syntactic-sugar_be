import { ConflictException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Services, UserRoles } from 'src/utils/constants';
import { IUserService } from 'src/modules/user/interfaces/IUserService';
import { InjectRepository } from '@nestjs/typeorm';
import { Employer } from 'src/database/entities/employer.entity';
import { Repository } from 'typeorm';
import { IEmployerService } from 'src/modules/employer/interfaces/IEmployerService';
import { CreateEmployerDto } from 'src/modules/employer/dtos/createEmployer.dto';
import { ITokenService } from 'src/modules/auth/interfaces/ITokenService';
import { User } from 'src/database/entities/users.entity';
import { IToken } from 'src/modules/auth/interfaces/IToken';

@Injectable()
export class EmployerService implements IEmployerService {
  constructor(
    @Inject(Services.USER) private readonly userService: IUserService,
    @Inject(Services.TOKEN) private readonly tokenService: ITokenService,
    @InjectRepository(Employer)
    private readonly employerRepository: Repository<Employer>,
  ) {}

  async createEmployer(user: User, createEmployerDto: CreateEmployerDto): Promise<IToken> {
    try {
      const isFreelancer = await this.isFreelancer(user);
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
      await this.userService.changeRole(user, UserRoles.JOB_OWNER);

      return this.tokenService.generateToken(user);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async isFreelancer(user: User): Promise<boolean> {
    try {
      const role = user.role;

      return role === UserRoles.FREELANCER;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
