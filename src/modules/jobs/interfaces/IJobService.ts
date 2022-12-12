import { Job } from 'src/database/entities/jobs.entity';
import { CreateJobDto } from 'src/modules/jobs/dto/createJobDto';

export interface IJobsService {
  createJob(createJobDto: CreateJobDto): Promise<Job>;
  getJobs(): Promise<Job[]>;
}
