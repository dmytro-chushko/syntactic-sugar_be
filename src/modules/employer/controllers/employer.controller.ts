import {
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Get,
  Body,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Routes, Services, UserRoles } from 'src/utils/constants';
import { IEmployerService } from 'src/modules/employer/interfaces/IEmployerService';
import { CreateEmployerDto } from 'src/modules/employer/dtos/createEmployer.dto';
import { User, Employer } from 'src/database/entities';
import { Auth } from 'src/utils/decorators/auth';
import { AuthJwtGuard } from 'src/modules/auth/guards/authJwt.guard';
import { ActivatedGuard } from 'src/modules/auth/guards/activated.guard';
import { Roles } from 'src/utils/decorators/roles';
import { RolesGuard } from 'src/modules/auth/guards/role.guard';
import { ITokenAndRole } from 'src/modules/auth/interfaces/ITokenAndRole';

@ApiTags('employer')
@Controller(Routes.EMPLOYER)
export class EmployerController {
  constructor(@Inject(Services.EMPLOYER) private employerService: IEmployerService) {}

  @ApiOperation({ summary: 'Create new employer' })
  @ApiBody({ type: CreateEmployerDto })
  @ApiResponse({ status: 201, description: 'created new employer' })
  @Post(Routes.CREATE_EMPLOYER)
  @Roles(UserRoles.EMPLOYER)
  @UseGuards(AuthJwtGuard, ActivatedGuard)
  @UsePipes(ValidationPipe)
  createEmployer(
    @Auth() user: User,
    @Body() createEmployerDto: CreateEmployerDto,
  ): Promise<ITokenAndRole> {
    return this.employerService.createEmployer(user, createEmployerDto);
  }

  @ApiOperation({ summary: 'Get employer profile' })
  @ApiQuery({ name: 'role', enum: UserRoles })
  @ApiResponse({ status: 201, description: 'Profile' })
  @Get(Routes.GET_PROFILE)
  @Roles(UserRoles.EMPLOYER)
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  getProfile(@Auth() user: User): Promise<Employer> {
    return this.employerService.getEmployer(user);
  }

  @ApiOperation({ summary: 'Update employer profile' })
  @ApiBody({ type: CreateEmployerDto })
  @ApiResponse({ status: 201, description: 'Profile updated' })
  @Put(Routes.UPDATE_EMPLOYER)
  @Roles(UserRoles.EMPLOYER)
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  updateProfile(@Auth() user: User, @Body() createEmployerDto: CreateEmployerDto): Promise<void> {
    return this.employerService.updateEmployer(user, createEmployerDto);
  }
}
