import {
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  UseGuards,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Routes, Services, UserRoles } from 'src/utils/constants';
import { IEmployerService } from 'src/modules/employer/interfaces/IEmployerService';
import { CreateEmployerDto } from 'src/modules/employer/dtos/createEmployer.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthJwtGuard } from '../../auth/guards/authJwt.guard';
import { ActivatedGuard } from '../../auth/guards/activated.guard';
import { Auth } from '../../../utils/decorators/auth';
import { RolesGuard } from '../../auth/guards/role.guard';
import { IPayload } from '../../auth/interfaces/IToken';
import { Roles } from '../../../utils/decorators/roles';

@ApiTags('employer')
@Controller(Routes.EMPLOYER)
export class EmployerController {
  constructor(@Inject(Services.EMPLOYER) private employerService: IEmployerService) {}

  @ApiBody({ type: CreateEmployerDto })
  @ApiResponse({ status: 201, description: 'created new employer' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post(Routes.CREATE_EMPLOYER)
  @UseGuards(AuthJwtGuard, ActivatedGuard)
  @UsePipes(ValidationPipe)
  createEmployer(@Auth() user, @Body() createEmployerDto: CreateEmployerDto) {
    return this.employerService.createEmployer(user, createEmployerDto);
  }

  @Get('test')
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  @Roles(UserRoles.EMPLOYER)
  testing(@Auth() user: IPayload) {
    return user;
  }
}
