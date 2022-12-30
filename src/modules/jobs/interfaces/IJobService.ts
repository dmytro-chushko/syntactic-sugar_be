import { DeleteResult, UpdateResult } from 'typeorm';
import { User, Job } from 'index';
import { CreateJobDto } from 'src/modules/jobs/dto/createJobDto';

export interface IJobsService {
  createJob(user: User, createJobDto: CreateJobDto): Promise<Job>;
  saveJob(user: User, createJobDto: CreateJobDto): Promise<Job>;
  getJobs(): Promise<Job[]>;
  getJobsWithProposals(user: User): Promise<Job[]>;
  getJobsByEmployer(user: User): Promise<Job[]>;
  getJobById(id: string): Promise<Job>;
  updateJobById(user: User, id: string, createJobDto: CreateJobDto): Promise<UpdateResult>;
  removeJobById(id: string): Promise<DeleteResult>;
  toggleIsPublishedJob(user: User, id: string): Promise<void>;
}
