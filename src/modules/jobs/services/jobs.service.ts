import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
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

      return job;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async saveJob(user: User, createJobDto: CreateJobDto): Promise<Job> {
    try {
      const job = await this.createJob(user, createJobDto);

      return await this.jobRepository.save(job);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getJobs(): Promise<Job[]> {
    try {
      const jobs = await this.jobRepository
        .createQueryBuilder('job')
        .leftJoinAndSelect('job.proposals', 'proposal')
        .leftJoinAndSelect('job.employer', 'employer')
        .leftJoinAndSelect('job.category', 'category')
        .leftJoinAndSelect('job.skills', 'skills')
        .leftJoinAndSelect('job.countries', 'countries')
        .leftJoinAndSelect('proposal.freelancer', 'freelancer')
        .leftJoinAndSelect('job.chats', 'chat')
        .leftJoinAndSelect('chat.freelancer', 'freelancerChat')
        .leftJoinAndSelect('job.invitation', 'invitation')
        .leftJoinAndSelect('invitation.freelancer', 'freelancerInvitation')
        .orderBy('job.createdDate', 'DESC')
        .getMany();

      return jobs;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getJobsByEmployer(user: User): Promise<Job[]> {
    try {
      const employer = await this.employerService.getEmployer(user);

      const jobs = await this.jobRepository.find({
        relations: {
          employer: true,
          category: true,
          skills: true,
          countries: true,
          proposals: { freelancer: true },
        },
        select: {
          proposals: {
            id: true,
            coverLetter: true,
            freelancer: { id: true },
          },
        },
        where: { employer },
        order: { updatedDate: 'DESC' },
      });

      return jobs;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getJobById(id: string): Promise<Job> {
    try {
      const jobById = await this.jobRepository.findOne({
        where: { id },
        relations: ['employer', 'skills', 'category', 'countries', 'proposals'],
        select: {
          proposals: {
            id: true,
            coverLetter: true,
          },
        },
      });

      return jobById;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getJobsWithProposals(user: User): Promise<Job[]> {
    try {
      const jobsWithProposals = await this.jobRepository.find({
        where: { proposals: { freelancer: { user } } },
        relations: ['category', 'skills', 'countries', 'proposals'],
      });

      return jobsWithProposals;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateJobById(user: User, id: string, createJobDto: CreateJobDto): Promise<void> {
    try {
      const newJob = await this.createJob(user, createJobDto);
      const job = await this.jobRepository.findOne({
        where: { id },
      });

      await this.jobRepository.save({ ...job, ...newJob });
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async toggleIsPublishedJob(user: User, id: string): Promise<void> {
    try {
      const employer = await this.employerService.getEmployer(user);
      const job = await this.getJobById(id);
      const result = await this.jobRepository.update(
        { id, employer },
        { isPublished: !job.isPublished },
      );
      if (!result.affected) {
        throw new HttpException(
          'You cannot change this job because it does not belong to you',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeJobById(id: string): Promise<DeleteResult> {
    try {
      return await this.jobRepository.delete(id);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
