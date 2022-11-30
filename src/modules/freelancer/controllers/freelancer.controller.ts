import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Routes, Services, UserRoles } from 'src/utils/constants';
import { IFreelancerService } from 'src/modules/freelancer/interfaces/IFreelancerService';
import { AuthJwtGuard } from 'src/modules/auth/guards/authJwt.guard';
import { ActivatedGuard } from 'src/modules/auth/guards/activated.guard';
import { Auth } from 'src/utils/decorators/auth';
import { IPayload } from 'src/modules/auth/interfaces/IToken';
import { CreateFreelancerDto } from 'src/modules/freelancer/dtos/createFreelancer.dto';
import { Roles } from 'src/utils/decorators/roles';
import { RolesGuard } from 'src/modules/auth/guards/role.guard';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { EditPublishedDto } from '../dtos/editPublished.dto';

@Controller(Routes.FREELANCER)
export class FreelancerController {
  constructor(@Inject(Services.FREELANCER) private freelancerService: IFreelancerService) {}
  @ApiBody({ type: CreateFreelancerDto })
  @ApiResponse({ status: 201, description: 'freelancer is created' })
  @Post(Routes.CREATE_FREELANCER)
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthJwtGuard)
  @UsePipes(ValidationPipe)
  createFreelancer(@Auth() user, @Body() createFreelancerDto: CreateFreelancerDto) {
    return this.freelancerService.createFreelancer(user, createFreelancerDto);
  }

  @Post(Routes.EDIT_PUBLISHED)
  @UseGuards(AuthJwtGuard)
  @UsePipes(ValidationPipe)
  isPublished(@Auth() user, @Body() editPublishedDto: EditPublishedDto) {
    return this.freelancerService.editPublished(user, editPublishedDto.isPublished);
  }

  @Get('testing')
  @Roles(UserRoles.FREELANCER)
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  testing(@Auth() { id }: IPayload) {
    return id;
  }
}
