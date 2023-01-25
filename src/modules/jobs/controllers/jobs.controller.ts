import {
  Body,
  Controller,
  Inject,
  Post,
  Get,
  UseGuards,
  Param,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Routes, Services, UserRoles } from 'src/utils/constants';
import { CreateJobDto } from 'src/modules/jobs/dto/createJobDto';
import { IJobsService } from 'src/modules/jobs/interfaces/IJobService';
import { AuthJwtGuard } from 'src/modules/auth/guards/authJwt.guard';
import { ActivatedGuard } from 'src/modules/auth/guards/activated.guard';
import { RolesGuard } from 'src/modules/auth/guards/role.guard';
import { Roles } from 'src/utils/decorators/roles';
import { Auth } from 'src/utils/decorators/auth';
import { User, Job } from 'src/database/entities';

@ApiTags('jobs')
@Controller(Routes.JOBS)
export class JobsController {
  constructor(@Inject(Services.JOBS) private jobsService: IJobsService) {}

  @ApiOperation({ summary: 'Get jobs from all employers' })
  @ApiQuery({ name: 'role', enum: UserRoles, enumName: UserRoles.FREELANCER })
  @ApiResponse({ status: 201, description: 'Get all jobs' })
  @Get(Routes.GET_JOBS)
  getJobs(): Promise<Job[]> {
    return this.jobsService.getJobs();
  }

  @ApiOperation({ summary: 'Get all employer`s jobs' })
  @ApiQuery({ name: 'role', enum: UserRoles, enumName: UserRoles.EMPLOYER })
  @ApiResponse({ status: 201, description: 'Get all jobs by Employer' })
  @Get(Routes.GET_JOBS_BY_EMPLOYER)
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  @Roles(UserRoles.EMPLOYER)
  getJobsByEmployer(@Auth() user: User): Promise<Job[]> {
    return this.jobsService.getJobsByEmployer(user);
  }

  @ApiOperation({ summary: 'Create new job' })
  @ApiBody({ type: CreateJobDto })
  @ApiResponse({ status: 201, description: 'created new job' })
  @Post(Routes.CREATE_JOB)
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  @Roles(UserRoles.EMPLOYER)
  createJob(@Auth() user: User, @Body() createJobDto: CreateJobDto): Promise<Job> {
    return this.jobsService.saveJob(user, createJobDto);
  }

  @ApiOperation({ summary: 'Update job' })
  @ApiQuery({ name: 'id' })
  @ApiBody({ type: CreateJobDto })
  @ApiResponse({ status: 201, description: 'job has updated' })
  @Put(Routes.UPDATE_JOB_BY_ID)
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  @Roles(UserRoles.EMPLOYER)
  updateJobById(
    @Auth() user: User,
    @Param('id') id: string,
    @Body() createJobDto: CreateJobDto,
  ): Promise<void> {
    return this.jobsService.updateJobById(user, id, createJobDto);
  }

  @ApiOperation({ summary: 'Delete job' })
  @ApiQuery({ name: 'id' })
  @ApiResponse({ status: 201, description: 'job has removed' })
  @Delete(Routes.REMOVE_JOB_BY_ID)
  removeJobById(@Param('id') id: string): Promise<DeleteResult> {
    return this.jobsService.removeJobById(id);
  }

  @ApiOperation({ summary: 'Get job by id' })
  @ApiQuery({ name: 'id' })
  @ApiResponse({ status: 201, description: 'Get job by id' })
  @Get(Routes.GET_JOB_BY_ID)
  getJobById(@Param('id') id: string): Promise<Job> {
    return this.jobsService.getJobById(id);
  }

  @ApiOperation({ summary: 'Get jobs which have proposals from freelancers' })
  @ApiQuery({ name: 'role', enum: UserRoles })
  @ApiBody({ type: User })
  @ApiResponse({ status: 201, description: 'Get jobs with proposals' })
  @Get(Routes.GET_JOB_BY_PROPOSALS)
  getJobsWithProposals(@Body() user: User): Promise<Job[]> {
    return this.jobsService.getJobsWithProposals(user);
  }

  @ApiOperation({ summary: 'Change job`s status `is published`' })
  @ApiQuery({ name: 'id' })
  @ApiResponse({ status: 200, description: 'job has published' })
  @Patch(Routes.PUBLISH_JOB)
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  @Roles(UserRoles.EMPLOYER)
  toggleIsPublishedJob(@Auth() user: User, @Param('id') id: string): Promise<void> {
    return this.jobsService.toggleIsPublishedJob(user, id);
  }
}
