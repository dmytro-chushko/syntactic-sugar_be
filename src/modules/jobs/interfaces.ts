import { Job } from 'src/database/entities/jobs.entity';
import { CreateJobDto } from './dto/createJobDto';

export interface IJobsService {
  createJob(createJobDto: CreateJobDto): Promise<Job>;
}
