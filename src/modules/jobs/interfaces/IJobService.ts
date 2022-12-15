import { User, Job } from 'src/database/entities';
import { CreateJobDto } from 'src/modules/jobs/dto/createJobDto';

export interface IJobsService {
  createJob(user: User, createJobDto: CreateJobDto): Promise<Job>;
  getJobs(): Promise<Job[]>;
}
