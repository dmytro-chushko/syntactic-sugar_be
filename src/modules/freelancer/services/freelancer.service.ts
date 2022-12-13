import { ConflictException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IFreelancerService } from 'src/modules/freelancer/interfaces/IFreelancerService';
import { InjectRepository } from '@nestjs/typeorm';
import { Freelancer } from 'src/database/entities/freelancer.entity';
import { CreateFreelancerDto } from 'src/modules/freelancer/dtos/createFreelancer.dto';
import { IToken } from 'src/modules/auth/interfaces/IToken';
import { Services, UserRoles } from 'src/utils/constants';
import { ITokenService } from 'src/modules/auth/interfaces/ITokenService';
import { IUserService } from 'src/modules/user/interfaces/IUserService';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/users.entity';
import { IFilesService } from 'src/modules/files/interfaces/IFilesService';

@Injectable()
export class FreelancerService implements IFreelancerService {
  constructor(
    @InjectRepository(Freelancer) private readonly freelancerRepository: Repository<Freelancer>,
    @Inject(Services.USER) private readonly userService: IUserService,
    @Inject(Services.TOKEN) private readonly tokenService: ITokenService,
    @Inject(Services.FILES) private readonly filesService: IFilesService,
  ) {}

  async createFreelancer(user: User, createFreelancerDto: CreateFreelancerDto): Promise<IToken> {
    try {
      const isEmployer = await this.isEmployer(user);
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
        education: createFreelancerDto.education,
        workHistory: createFreelancerDto.workHistory,
        otherExperience: createFreelancerDto.otherExperience,
        user: user,
      });
      await this.freelancerRepository.save(freelancer);
      await this.userService.changeRole(user, UserRoles.FREELANCER);

      return this.tokenService.generateToken(user);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async isEmployer(user: User): Promise<boolean> {
    //this func will check if user already exists in employer repo
    //right now i haven`t implementation of employer module yet
    //when it will be on develop i will fix , while i haven`t returns false
    console.log(user);

    return false;
  }

  async createImage(image: any): Promise<string> {
    try {
      const fileName = await this.filesService.createFile(image);

      return fileName;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async editPublished(user: User, publ: boolean): Promise<IToken> {
    try {
      await this.freelancerRepository.update({ user: user }, { isPublished: publ });

      return this.tokenService.generateToken(user);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
