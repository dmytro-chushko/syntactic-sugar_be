import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Services, UserRoles } from 'src/utils/constants';
import { IEmployerService } from 'src/modules/employer/interfaces/IEmployerService';
import { CreateEmployerDto } from 'src/modules/employer/dtos/createEmployer.dto';
import { ITokenService } from 'src/modules/auth/interfaces/ITokenService';
import { Roles } from 'src/utils/decorators/roles';
import { User, Employer } from 'src/database/entities';
import { ITokenAndRole } from 'src/modules/auth/interfaces/ITokenAndRole';

@Injectable()
@Roles(UserRoles.EMPLOYER)
export class EmployerService implements IEmployerService {
  constructor(
    @Inject(Services.TOKEN) private readonly tokenService: ITokenService,
    @InjectRepository(Employer)
    private readonly employerRepository: Repository<Employer>,
  ) {}

  async createEmployer(user: User, createEmployerDto: CreateEmployerDto): Promise<ITokenAndRole> {
    try {
      const employer = this.employerRepository.create({
        fullName: createEmployerDto.fullName,
        companyName: createEmployerDto.companyName,
        position: createEmployerDto.position,
        phone: createEmployerDto.phone,
        linkedIn: createEmployerDto.linkedIn,
        website: createEmployerDto.website,
        aboutUs: createEmployerDto.aboutUs,
        image: createEmployerDto.image,
        user: user,
      });
      await this.employerRepository.save(employer);
      const token = await this.tokenService.generateToken(user);

      return { token: token.token, role: user.role };
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getEmployer(user: User): Promise<Employer | null> {
    try {
      const employer = await this.employerRepository.findOne({
        where: { user },
        relations: ['user'],
        select: {
          user: {
            id: true,
            email: true,
          },
        },
      });

      return employer;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getEmployerById(id: string): Promise<Employer | null> {
    try {
      const employer = await this.employerRepository.findOne({ where: { id } });

      return employer;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateEmployer(user: User, createEmployerDto: CreateEmployerDto): Promise<void> {
    try {
      const employer = await this.getEmployer(user);

      await this.employerRepository.save({
        ...employer,
        fullName: createEmployerDto.fullName,
        companyName: createEmployerDto.companyName,
        position: createEmployerDto.position,
        phone: createEmployerDto.phone,
        linkedIn: createEmployerDto.linkedIn,
        website: createEmployerDto.website,
        aboutUs: createEmployerDto.aboutUs,
        image: createEmployerDto.image,
      });
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
