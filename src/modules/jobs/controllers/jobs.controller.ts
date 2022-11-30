import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { CreateJobDto } from 'src/modules/jobs/dto/createJobDto';
import { IJobsService } from '../interfaces';
import { Job } from 'src/database/entities/jobs.entity';

@Controller(Routes.JOBS)
export class JobsController {
  constructor(@Inject(Services.JOBS) private jobsService: IJobsService) {}

  @Post(Routes.CREATE_JOB)
  createJob(@Body() createJobDto: CreateJobDto): Promise<Job> {
    return this.jobsService.createJob(createJobDto);
  }
}
