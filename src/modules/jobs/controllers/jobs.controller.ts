import { Body, Controller, Inject, Post, Get } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { CreateJobDto } from 'src/modules/jobs/dto/createJobDto';
import { IJobsService } from 'src/modules/jobs/interfaces/IJobService';
import { Job } from 'src/database/entities/jobs.entity';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller(Routes.JOBS)
export class JobsController {
  constructor(@Inject(Services.JOBS) private jobsService: IJobsService) {}

  @ApiBody({ type: CreateJobDto })
  @ApiResponse({ status: 201, description: 'created new job' })
  @Post(Routes.CREATE_JOB)
  createJob(@Body() createJobDto: CreateJobDto): Promise<Job> {
    return this.jobsService.createJob(createJobDto);
  }

  @ApiResponse({ status: 201, description: 'Get all jobs' })
  @Get(Routes.GET_JOBS)
  getJobs(): Promise<Job[]> {
    return this.jobsService.getJobs();
  }
}
