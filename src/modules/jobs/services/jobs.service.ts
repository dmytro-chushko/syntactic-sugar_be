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
    @InjectRepository(Country) private readonly countryRepository: Repository<Country>,
    @InjectRepository(Skill) private readonly skillRepository: Repository<Skill>,
  ) {}

  async createJob(createJobDto: CreateJobDto): Promise<Job> {
    try {
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

      let category = await this.categoryRepository.findOneBy(createJobDto.category);
      if (!category) {
        category = this.categoryRepository.create(createJobDto.category);
        category.jobs = [job];
        await this.categoryRepository.save(category);
      } else {
        category.jobs.push(job);
      }

      job.category = category;
      job.countries = [];

      await this.categoryRepository.update(category.id, { jobs: category.jobs });

      createJobDto.countries.map(async country => {
        let selectedCountry = await this.countryRepository.findOneBy(country);
        if (!selectedCountry) {
          selectedCountry = this.countryRepository.create(country);
          selectedCountry.jobs = [job];
          await this.categoryRepository.save(country);
        } else {
          selectedCountry.jobs.push(job);
        }

        job.countries.push(selectedCountry);

        await this.countryRepository.update(selectedCountry.id, { jobs: selectedCountry.jobs });
      });

      return await this.jobRepository.save(job);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
