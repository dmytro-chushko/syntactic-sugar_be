import { Body, Controller, Inject, Post, Get, UseGuards, Param, Put, Delete } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
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
import { JobIdDto } from 'src/modules/jobs/dto/jobIdDto';

@Controller(Routes.JOBS)
export class JobsController {
  constructor(@Inject(Services.JOBS) private jobsService: IJobsService) {}

  @ApiResponse({ status: 201, description: 'Get all jobs' })
  @Get(Routes.GET_JOBS)
  getJobs(): Promise<Job[]> {
    return this.jobsService.getJobs();
  }

  @ApiResponse({ status: 201, description: 'Get all jobs by Employer' })
  @Get(Routes.GET_JOBS_BY_EMPLOYER)
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  @Roles(UserRoles.EMPLOYER)
  getJobsByEmployer(@Auth() user: User): Promise<Job[]> {
    return this.jobsService.getJobsByEmployer(user);
  }

  @ApiBody({ type: CreateJobDto })
  @ApiResponse({ status: 201, description: 'created new job' })
  @Post(Routes.CREATE_JOB)
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  @Roles(UserRoles.EMPLOYER)
  createJob(@Auth() user: User, @Body() createJobDto: CreateJobDto): Promise<Job> {
    return this.jobsService.saveJob(user, createJobDto);
  }

  @ApiBody({ type: CreateJobDto })
  @ApiResponse({ status: 201, description: 'job has updated' })
  @Put(Routes.UPDATE_JOB_BY_ID)
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  @Roles(UserRoles.EMPLOYER)
  updateJobById(
    @Auth() user: User,
    @Param('id') id: string,
    @Body() createJobDto: CreateJobDto,
  ): Promise<UpdateResult> {
    return this.jobsService.updateJobById(user, id, createJobDto);
  }

  @ApiResponse({ status: 201, description: 'job has removed' })
  @Delete(Routes.REMOVE_JOB_BY_ID)
  removeJobById(@Param('id') id: string): Promise<DeleteResult> {
    return this.jobsService.removeJobById(id);
  }

  @ApiResponse({ status: 201, description: 'Get job by id' })
  @Get(Routes.GET_JOB_BY_ID)
  getJobById(@Body() jobIdDto: JobIdDto): Promise<Job> {
    return this.jobsService.getJobById(jobIdDto.id);
  }

  @ApiResponse({ status: 201, description: 'Get jobs with proposals' })
  @Get(Routes.GET_JOB_BY_PROPOSALS)
  getJobByProposal(@Body() user: User): Promise<Job[]> {
    return this.jobsService.getJobByProposal(user);
  }
}
