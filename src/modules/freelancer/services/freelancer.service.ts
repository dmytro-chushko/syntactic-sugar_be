import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFreelancerService } from 'src/modules/freelancer/interfaces/IFreelancerService';
import { Freelancer } from 'src/database/entities/freelancer.entity';
import { CreateFreelancerDto } from 'src/modules/freelancer/dtos/createFreelancer.dto';
import { Services } from 'src/utils/constants';
import { ITokenService } from 'src/modules/auth/interfaces/ITokenService';
import { IUserService } from 'src/modules/user/interfaces/IUserService';
import { User } from 'src/database/entities/users.entity';
import { ICategoriesService } from 'src/modules/categories/interfaces/ICategoriesService';
import { ISkillsService } from 'src/modules/skills/interfaces/ISkillsService';
import { ICountriesService } from 'src/modules/countries/interfaces/ICountriesService';
import { ITokenAndRole } from 'src/modules/auth/interfaces/ITokenAndRole';

@Injectable()
export class FreelancerService implements IFreelancerService {
  constructor(
    @InjectRepository(Freelancer) private readonly freelancerRepository: Repository<Freelancer>,
    @Inject(Services.USER) private readonly userService: IUserService,
    @Inject(Services.TOKEN) private readonly tokenService: ITokenService,
    @Inject(Services.CATEGORIES) private readonly categoriesService: ICategoriesService,
    @Inject(Services.SKILLS) private readonly skillsService: ISkillsService,
    @Inject(Services.COUNTRIES) private readonly countriesService: ICountriesService,
  ) {}

  async createFreelancer(
    user: User,
    createFreelancerDto: CreateFreelancerDto,
  ): Promise<ITokenAndRole> {
    try {
      let country = await this.countriesService.getCountryByName(createFreelancerDto.country);
      if (!country) {
        country = await this.countriesService.createCountry({ name: createFreelancerDto.country });
      }
      let category = await this.categoriesService.getCategoryByName(createFreelancerDto.category);
      if (!category) {
        category = await this.categoriesService.createCategory({
          name: createFreelancerDto.category,
        });
      }
      const skills = await Promise.all(
        createFreelancerDto.skills.map(async skill => {
          try {
            const existingSkill = await this.skillsService.getSkillByName(skill);
            if (!existingSkill) {
              return await this.skillsService.createSkill({ name: skill });
            }

            return existingSkill;
          } catch (error) {
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
          }
        }),
      );
      const freelancer = this.freelancerRepository.create({
        fullName: createFreelancerDto.fullName,
        category,
        country,
        hourRate: createFreelancerDto.hourRate,
        position: createFreelancerDto.position,
        availableAmountOfHours: createFreelancerDto.availableAmountOfHours,
        employmentType: createFreelancerDto.employmentType,
        workExperience: createFreelancerDto.workExperience,
        englishLevel: createFreelancerDto.englishLevel,
        skills,
        image: createFreelancerDto.image,
        education: createFreelancerDto.education,
        workHistory: createFreelancerDto.workHistory,
        otherExperience: createFreelancerDto.otherExperience,
        user: user,
      });
      await this.freelancerRepository.save(freelancer);
      const token = await this.tokenService.generateToken(user);

      return { token: token.token, role: user.role };
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async editPublished(user: User, publ: boolean): Promise<string> {
    try {
      await this.freelancerRepository.update({ user: user }, { isPublished: publ });
      const message = 'Freelancer profile is published';

      return message;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getProfile(user: User): Promise<Freelancer> {
    try {
      const profile = await this.freelancerRepository.findOne({
        where: { user: user },
        relations: ['skills', 'category', 'country', 'user', 'proposals'],
        select: {
          user: {
            id: true,
            email: true,
          },
        },
      });

      return profile;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getFreelancerById(id: string): Promise<Freelancer> {
    try {
      const profile = await this.freelancerRepository.findOneBy({ id: id });

      return profile;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
