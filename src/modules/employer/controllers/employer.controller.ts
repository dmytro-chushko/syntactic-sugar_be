import {
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Routes, Services, UserRoles } from 'src/utils/constants';
import { IEmployerService } from 'src/modules/employer/interfaces/IEmployerService';
import { CreateEmployerDto } from 'src/modules/employer/dtos/createEmployer.dto';
import { User, Employer } from 'src/database/entities';
import { Auth } from 'src/utils/decorators/auth';
import { AuthJwtGuard } from 'src/modules/auth/guards/authJwt.guard';
import { ActivatedGuard } from 'src/modules/auth/guards/activated.guard';
import { Roles } from 'src/utils/decorators/roles';
import { RolesGuard } from 'src/modules/auth/guards/role.guard';

@ApiTags('employers')
@Controller(Routes.EMPLOYER)
export class EmployerController {
  constructor(@Inject(Services.EMPLOYER) private employerService: IEmployerService) {}

  @ApiBody({ type: CreateEmployerDto })
  @ApiResponse({ status: 201, description: 'created new employer' })
  @Post(Routes.CREATE_EMPLOYER)
  @Roles(UserRoles.EMPLOYER)
  @UseGuards(AuthJwtGuard, ActivatedGuard)
  @UsePipes(ValidationPipe)
  createEmployer(@Auth() user: User, @Body() createEmployerDto: CreateEmployerDto) {
    return this.employerService.createEmployer(user, createEmployerDto);
  }

  @ApiResponse({ status: 201, description: 'Profile' })
  @Get(Routes.GET_PROFILE)
  @Roles(UserRoles.EMPLOYER)
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  getProfile(@Auth() user: User): Promise<Employer> {
    return this.employerService.getEmployer(user);
  }
}
