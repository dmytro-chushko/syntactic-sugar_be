import { Body, Controller, Inject, Post, Get, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Routes, Services, UserRoles } from 'src/utils/constants';
import { CreateJobDto } from 'src/modules/jobs/dto/createJobDto';
import { IJobsService } from 'src/modules/jobs/interfaces/IJobService';
import { AuthJwtGuard } from 'src/modules/auth/guards/authJwt.guard';
import { ActivatedGuard } from 'src/modules/auth/guards/activated.guard';
import { RolesGuard } from 'src/modules/auth/guards/role.guard';
import { Roles } from 'src/utils/decorators/roles';
import { Auth } from 'src/utils/decorators/auth';
import { User, Job } from 'src/database/entities';

@Controller(Routes.JOBS)
export class JobsController {
  constructor(@Inject(Services.JOBS) private jobsService: IJobsService) {}

  @ApiBody({ type: CreateJobDto })
  @ApiResponse({ status: 201, description: 'created new job' })
  @Post(Routes.CREATE_JOB)
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  @Roles(UserRoles.EMPLOYER)
  createJob(@Auth() user: User, @Body() createJobDto: CreateJobDto): Promise<Job> {
    return this.jobsService.createJob(user, createJobDto);
  }

  @ApiResponse({ status: 201, description: 'Get all jobs' })
  @Get(Routes.GET_JOBS)
  getJobs(): Promise<Job[]> {
    return this.jobsService.getJobs();
  }
}
