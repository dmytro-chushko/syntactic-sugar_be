import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/database/entities/jobs.entity';
import { Repository } from 'typeorm';
import { CreateJobDto } from 'src/modules/jobs/dto/createJobDto';
import { IJobsService } from 'src/modules/jobs/interfaces';

@Injectable()
export class JobsService implements IJobsService {
  constructor(@InjectRepository(Job) private readonly jobRepository: Repository<Job>) {}

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

      return await this.jobRepository.save(job);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
