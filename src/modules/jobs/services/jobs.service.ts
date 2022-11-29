import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/category.entity';
import { Country } from 'src/database/entities/country.entity';
import { Job } from 'src/database/entities/jobs.entity';
import { Skill } from 'src/database/entities/skill.entity';
import { Repository } from 'typeorm';
import { CreateJobDto } from '../dto/createJobDto';
import { IJobsService } from '../interfaces';

@Injectable()
export class JobsService implements IJobsService {
  constructor(
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Country) private readonly contryRepository: Repository<Country>,
    @InjectRepository(Skill) private readonly skillRepository: Repository<Skill>,
  ) {}

  async createJob(createJobDto: CreateJobDto): Promise<Job> {
    try {
      // const category = this.categoryRepository.create({ name: createJobDto.category });
      const job = this.jobRepository.create({
        title: createJobDto.title,
        description: createJobDto.description,
        position: createJobDto.position,
        employmentType: createJobDto.employmentType,
        hourRate: createJobDto.hourRate,
        availableAmountOfHours: createJobDto.availableAmountOfHours,
        workExperience: createJobDto.workExperience,
        levelEnglish: createJobDto.levelEnglish,
        otherRequirenments: createJobDto.otherRequirenments,
      });

      return await this.jobRepository.save(job);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
