import {
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IEmployerService } from 'src/modules/employer/interfaces/IEmployerService';
import { CreateEmployerDto } from 'src/modules/employer/dtos/createEmployer.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthJwtGuard } from 'src/modules/auth/guards/authJwt.guard';
import { ActivatedGuard } from 'src/modules/auth/guards/activated.guard';
import { Auth } from 'src/utils/decorators/auth';

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
}
