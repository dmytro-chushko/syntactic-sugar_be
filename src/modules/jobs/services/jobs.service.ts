import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateJobDto } from 'src/modules/jobs/dto/createJobDto';
import { IJobsService } from 'src/modules/jobs/interfaces/IJobService';
import { Services } from 'src/utils/constants';
import { ICategoriesService } from 'src/modules/categories/interfaces/ICategoriesService';
import { ISkillsService } from 'src/modules/skills/interfaces/ISkillsService';
import { ICountriesService } from 'src/modules/countries/interfaces/ICountriesService';
import { IEmployerService } from 'src/modules/employer/interfaces/IEmployerService';
import { User, Job } from 'src/database/entities';

@Injectable()
export class JobsService implements IJobsService {
  constructor(
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
    @Inject(Services.CATEGORIES) private readonly categoriesService: ICategoriesService,
    @Inject(Services.SKILLS) private readonly skillsService: ISkillsService,
    @Inject(Services.COUNTRIES) private readonly countriesService: ICountriesService,
    @Inject(Services.EMPLOYER) private readonly employerService: IEmployerService,
  ) {}

  async createJob(user: User, createJobDto: CreateJobDto): Promise<Job> {
    try {
      const countries = await Promise.all(
        createJobDto.countries.map(async country => {
          try {
            const existingCountry = await this.countriesService.getCountryByName(country);
            if (!existingCountry) {
              return await this.countriesService.createCountry({ name: country });
            }

            return existingCountry;
          } catch (error) {
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
          }
        }),
      );

      const skills = await Promise.all(
        createJobDto.skills.map(async skill => {
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

      let category = await this.categoriesService.getCategoryByName(createJobDto.category);
      if (!category) {
        category = await this.categoriesService.createCategory({ name: createJobDto.category });
      }

      const employer = await this.employerService.getEmployer(user);

      const job = this.jobRepository.create({
        title: createJobDto.title,
        description: createJobDto.description,
        position: createJobDto.position,
        employmentType: createJobDto.employmentType,
        hourRate: createJobDto.hourRate,
        availableAmountOfHours: createJobDto.availableAmountOfHours,
        workExperience: createJobDto.workExperience,
        englishLevel: createJobDto.englishLevel,
        otherRequirenments: createJobDto.otherRequirenments,
        category,
        skills,
        countries,
        employer,
      });

      return await this.jobRepository.save(job);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getJobs(): Promise<Job[]> {
    try {
      const jobs = await this.jobRepository.find({
        relations: ['category', 'skills', 'countries'],
      });

      return jobs;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
