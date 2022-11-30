import { Body, Controller, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ActivatedGuard } from '../../auth/guards/activated.guard';
import { RolesGuard } from '../../auth/guards/role.guard';
import { AuthJwtGuard } from '../../auth/guards/authJwt.guard';
import { Routes, Services, UserRoles } from '../../../utils/constants';
import { CreateJobDto } from '../dtos/createJob.dto';
import { Auth } from '../../../utils/decorators/auth';
import { Roles } from '../../../utils/decorators/roles';
import { IJobService } from '../interfaces/IJobService';

@Controller(Routes.JOB)
export class JobController {
  constructor(@Inject(Services.JOB_SERVICES) private readonly jobsService: IJobService) {}

  @Post(Routes.JOB_CREATE)
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  @Roles(UserRoles.EMPLOYER)
  createJob(@Auth() user, @Body() createJobDto: CreateJobDto) {
    return this.jobsService.createJob(user, createJobDto);
  }

  @Get('getJob')
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  @Roles(UserRoles.EMPLOYER)
  getJobs(@Auth() user) {
    return this.jobsService.getEmployerJobs(user);
  }

  @Patch(':id')
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  @Roles(UserRoles.EMPLOYER)
  publishJob(@Auth() user, @Param('id') id: string) {
    return this.jobsService.publishJob(user, id);
  }
}
