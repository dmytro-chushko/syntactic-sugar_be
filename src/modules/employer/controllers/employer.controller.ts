// eslint-disable-next-line prettier/prettier
import { Controller, Inject, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IUserService } from 'src/modules/user/interfaces/IUserService';
import { IAuthService } from 'src/modules/auth/interfaces/IAuthService';
import { IEmployerService } from 'src/modules/employer/interfaces/IEmployerService';
import { CreateEmployerDto } from 'src/modules/employer/dtos/createEmployer.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('employer')
@Controller(Routes.CREATE_EMPLOYER)
export class EmployerController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USER) private userService: IUserService,
    @Inject(Services.EMPLOYER) private employerService: IEmployerService,
  ) {}

  @ApiBody({ type: CreateEmployerDto })
  @ApiResponse({ status: 200, description: 'created new employer' })
  @Post(Routes.CREATE_EMPLOYER)
  @UsePipes(ValidationPipe)
  createEmployer(@Body() createEmployerDto: CreateEmployerDto) {
    return this.employerService.createEmployer(createEmployerDto);
  }
}
