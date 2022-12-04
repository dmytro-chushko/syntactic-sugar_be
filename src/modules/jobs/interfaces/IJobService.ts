import { Job } from 'src/database/entities/job.entity';
import { CreateJobDto } from 'src/modules/jobs/dto/createJobDto';
import { User } from 'src/database/entities/users.entity';

export interface IJobService {
  createJob(user: User, createJobDto: CreateJobDto): Promise<Job>;
  getEmployerJobs(user: User): Promise<Job[]>;
  publishJob(user: User, jobId: string): Promise<void>;
}
