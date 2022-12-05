import { Inject, Injectable } from '@nestjs/common';
import { IJobService } from 'src/modules/jobs/interfaces/IJobService';
import { User } from 'src/database/entities/users.entity';
import { CreateJobDto } from 'src/modules/jobs/dto/createJobDto';
import { Job } from 'src/database/entities/job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Employer } from 'src/database/entities/employer.entity';
import { Repository } from 'typeorm';
import { Services } from 'src/utils/constants';
import { IEmployerService } from 'src/modules/employer/interfaces/IEmployerService';

@Injectable()
export class JobService implements IJobService {
  constructor(
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
    @InjectRepository(Employer) private readonly employerRepository: Repository<Employer>,
    @Inject(Services.EMPLOYER) private readonly employerService: IEmployerService,
  ) {}

  async createJob(user: User, createJobDto: CreateJobDto): Promise<Job> {
    const job = this.jobRepository.create({
      title: createJobDto.title,
      description: createJobDto.description,
      position: createJobDto.position,
      employmentType: createJobDto.employmentType,
      hourRate: createJobDto.hourRate,
      availableAmountOfHours: createJobDto.availableAmountOfHours,
      workExperience: createJobDto.workExperience,
      levelEnglish: createJobDto.levelEnglish,
      otherRequirements: createJobDto.otherRequirements,
      employer: await this.employerRepository
        .createQueryBuilder('employer')
        .leftJoinAndSelect('employer.user', 'user')
        .where({ user: user })
        .getOne(),
    });
    await this.jobRepository.save(job);

    return job;
  }

  async getEmployerJobs(user: User): Promise<Job[]> {
    const jobs = await this.jobRepository
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.employer', 'employer')
      .where({ employer: { user: user } })
      .getMany();

    return jobs;
  }

  async publishJob(user: User, jobId: string): Promise<void> {
    const job = await this.jobRepository
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.employer', 'employer')
      .where({
        employer: { user: user },
        id: jobId,
      })
      .getOne();
    job.isPublished = true;
    await this.jobRepository.save(job);
  }
}
