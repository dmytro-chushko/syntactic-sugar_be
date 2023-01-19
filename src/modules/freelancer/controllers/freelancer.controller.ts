import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Routes, Services, UserRoles } from 'src/utils/constants';
import { IFreelancerService } from 'src/modules/freelancer/interfaces/IFreelancerService';
import { AuthJwtGuard } from 'src/modules/auth/guards/authJwt.guard';
import { ActivatedGuard } from 'src/modules/auth/guards/activated.guard';
import { Auth } from 'src/utils/decorators/auth';
import { CreateFreelancerDto } from 'src/modules/freelancer/dtos/createFreelancer.dto';
import { Roles } from 'src/utils/decorators/roles';
import { RolesGuard } from 'src/modules/auth/guards/role.guard';
import { EditPublishedDto } from 'src/modules/freelancer/dtos/editPublished.dto';
import { Freelancer } from 'src/database/entities/freelancer.entity';
import { ITokenAndRole } from 'src/modules/auth/interfaces/ITokenAndRole';

@Controller(Routes.FREELANCER)
export class FreelancerController {
  constructor(@Inject(Services.FREELANCER) private freelancerService: IFreelancerService) {}
  @ApiBody({ type: CreateFreelancerDto })
  @ApiResponse({ status: 201, description: 'freelancer is created' })
  @Post(Routes.CREATE_FREELANCER)
  @UseGuards(AuthJwtGuard, ActivatedGuard)
  @UsePipes(ValidationPipe)
  createFreelancer(
    @Auth() user,
    @Body() createFreelancerDto: CreateFreelancerDto,
  ): Promise<ITokenAndRole> {
    return this.freelancerService.createFreelancer(user, createFreelancerDto);
  }

  @ApiBody({ type: EditPublishedDto })
  @ApiResponse({ status: 201, description: 'Profile is published' })
  @Post(Routes.EDIT_PUBLISHED)
  @UseGuards(AuthJwtGuard)
  @Roles(UserRoles.FREELANCER)
  @UsePipes(ValidationPipe)
  isPublished(@Auth() user, @Body() editPublishedDto: EditPublishedDto): Promise<string> {
    return this.freelancerService.editPublished(user, editPublishedDto.isPublished);
  }

  @ApiResponse({ status: 201, description: 'Profile' })
  @Get(Routes.GET_PROFILE)
  @Roles(UserRoles.FREELANCER)
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  getProfile(@Auth() user): Promise<Freelancer> {
    return this.freelancerService.getProfile(user);
  }

  @ApiResponse({ status: 200, description: 'All pofiles' })
  @Get(Routes.ALL_FREELANCERS)
  @Roles(UserRoles.EMPLOYER)
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  getAllFreelancers(@Auth() user): Promise<Freelancer[]> {
    return this.freelancerService.getAllFreelancers(user);
  }

  @ApiResponse({ status: 200, description: 'Get pofile by id' })
  @Get(Routes.GET_FREELANCER_BY_ID)
  @Roles(UserRoles.EMPLOYER)
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  getFreelancerById(@Param('id') id: string): Promise<Freelancer> {
    return this.freelancerService.getFreelancerById(id);
  }
}
