import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { IUserService } from 'src/modules/user/interfaces/IUserService';
import { InjectRepository } from '@nestjs/typeorm';
import { Employer } from 'src/database/entities/employer.entity';
import { Repository } from 'typeorm';
import { IEmployerService } from 'src/modules/employer/interfaces/IEmployerService';
import { CreateEmployerDto } from 'src/modules/employer/dtos/createEmployer.dto';

@Injectable()
export class EmployerService implements IEmployerService {
  constructor(
    @Inject(Services.USER) private readonly userService: IUserService,
    @InjectRepository(Employer)
    private readonly employerRepository: Repository<Employer>,
  ) {}

  async createEmployer(createEmployerDto: CreateEmployerDto) {
    try {
      // here will be cheking for existing user by token
      const employer = this.employerRepository.create({
        fullName: createEmployerDto.fullName,
        companyName: createEmployerDto.companyName,
        position: createEmployerDto.position,
        phone: createEmployerDto.phone,
        linkedIn: createEmployerDto.linkedIn,
        website: createEmployerDto.website,
        aboutUs: createEmployerDto.aboutUs,
        // user: user (after we providet jwt logic)
      });
      await this.employerRepository.save(employer);
      // user.role = UserRole.Employer;

      return employer;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
