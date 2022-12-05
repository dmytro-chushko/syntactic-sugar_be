import { Controller, Inject, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IEmployerService } from 'src/modules/employer/interfaces/IEmployerService';
import { CreateEmployerDto } from 'src/modules/employer/dtos/createEmployer.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('employers')
@Controller(Routes.EMPLOYER)
export class EmployerController {
  constructor(@Inject(Services.EMPLOYER) private employerService: IEmployerService) {}

  @ApiBody({ type: CreateEmployerDto })
  @ApiResponse({ status: 201, description: 'created new employer' })
  @Post(Routes.CREATE_EMPLOYER)
  @UsePipes(ValidationPipe)
  createEmployer(@Body() createEmployerDto: CreateEmployerDto) {
    return this.employerService.createEmployer(createEmployerDto);
  }
}
