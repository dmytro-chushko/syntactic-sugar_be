import { CreateJobDto } from '../dtos/createJob.dto';
import { Job } from '../../../database/entities/job.entity';
import { User } from '../../../database/entities/users.entity';

export interface IJobService {
  createJob(user: User, createJobDto: CreateJobDto): Promise<Job>;
  getEmployerJobs(user: User): Promise<Job[]>;
  publishJob(user: User, jobId: string): Promise<void>;
}
