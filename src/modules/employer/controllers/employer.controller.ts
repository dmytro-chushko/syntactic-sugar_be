import { Controller, Inject, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IEmployerService } from 'src/modules/employer/interfaces/IEmployerService';
import { CreateEmployerDto } from 'src/modules/employer/dtos/createEmployer.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/database/entities/users.entity';

@ApiTags('employer')
@Controller(Routes.EMPLOYER)
export class EmployerController {
  constructor(@Inject(Services.EMPLOYER) private employerService: IEmployerService) {}

  @ApiBody({ type: CreateEmployerDto })
  @ApiResponse({ status: 201, description: 'created new employer' })
  @Post(Routes.CREATE_EMPLOYER)
  @UsePipes(ValidationPipe)
  createEmployer(@Body() user: User, createEmployerDto: CreateEmployerDto) {
    return this.employerService.createEmployer(user, createEmployerDto);
  }
}
