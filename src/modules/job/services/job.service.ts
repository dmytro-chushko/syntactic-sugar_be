import { Inject, Injectable } from '@nestjs/common';
import { IJobService } from '../interfaces/IJobService';
import { User } from '../../../database/entities/users.entity';
import { CreateJobDto } from '../dtos/createJob.dto';
import { Job } from '../../../database/entities/job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Employer } from '../../../database/entities/employer.entity';
import { Repository } from 'typeorm';
import { Services } from '../../../utils/constants';
import { IEmployerService } from '../../employer/interfaces/IEmployerService';

@Injectable()
export class JobService implements IJobService {
  constructor(
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
    @InjectRepository(Employer) private readonly employerRepository: Repository<Employer>,
    @Inject(Services.EMPLOYER) private readonly employerService: IEmployerService,
  ) {}

  async createJob(user: User, createJobDto: CreateJobDto): Promise<Job> {
    const employer = await this.employerService.findEmployer(user);
    console.log(employer);
    const job = this.jobRepository.create({
      positionForJob: createJobDto.positionForJob,
      description: createJobDto.description,
      employer: employer,
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
}
