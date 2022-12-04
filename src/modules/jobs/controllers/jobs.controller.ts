import { Body, Controller, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Routes, Services, UserRoles } from 'src/utils/constants';
import { CreateJobDto } from 'src/modules/jobs/dto/createJobDto';
import { IJobService } from 'src/modules/jobs/interfaces/IJobService';
import { AuthJwtGuard } from 'src/modules/auth/guards/authJwt.guard';
import { RolesGuard } from 'src/modules/auth/guards/role.guard';
import { ActivatedGuard } from 'src/modules/auth/guards/activated.guard';
import { Auth } from 'src/utils/decorators/auth';
import { Roles } from 'src/utils/decorators/roles';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller(Routes.JOBS)
export class JobsController {
  constructor(@Inject(Services.JOBS) private jobsService: IJobService) {}

  @ApiBody({ type: CreateJobDto })
  @ApiResponse({ status: 201, description: 'created new job' })
  @Post(Routes.CREATE_JOB)
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  @Roles(UserRoles.EMPLOYER)
  createJob(@Auth() user, @Body() createJobDto: CreateJobDto) {
    return this.jobsService.createJob(user, createJobDto);
  }

  @ApiResponse({ status: 200, description: 'get all jobs for employer' })
  @Get(Routes.GET_JOBS)
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  @Roles(UserRoles.EMPLOYER)
  getJobs(@Auth() user) {
    return this.jobsService.getEmployerJobs(user);
  }

  @ApiParam({ name: 'job`s id' })
  @ApiResponse({ status: 200, description: 'field isPublished in job entity changed on true' })
  @Patch(':id')
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  @Roles(UserRoles.EMPLOYER)
  publishJob(@Auth() user, @Param('id') id: string) {
    return this.jobsService.publishJob(user, id);
  }
}
