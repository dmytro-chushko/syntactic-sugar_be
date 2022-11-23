import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IFreelancerService } from 'src/modules/freelancer/interfaces/IFreelancerService';
import { CreateFreelancerDto } from 'src/modules/freelancer/dtos/CreateFreelancer.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwtGuard';
import { JwtPayloadDto } from 'src/modules/auth/dtos/jwtPayload.dto';
import { Auth } from 'src/utils/decorators/auth';
import { ActivatedGuard } from 'src/modules/auth/guards/activatedGuard';
import { Activated } from 'src/utils/decorators/activated';
import { RolesGuard } from 'src/modules/auth/guards/roleGuard';
import { Roles } from 'src/utils/decorators/roles';
import { UserRole } from 'src/database/entities/users.entity';

@Controller('freelancer')
export class FreelancerController {
  constructor(
    @Inject(Services.FREELANCER) private freelancerService: IFreelancerService,
  ) {}
  @Post(Routes.FREELANCER_CREATE)
  @UsePipes(ValidationPipe)
  @Activated(true)
  @UseGuards(JwtAuthGuard, ActivatedGuard)
  createFreelancer(
    @Auth() { id }: JwtPayloadDto,
    @Body() createFreelancerDto: CreateFreelancerDto,
  ) {
    return this.freelancerService.createFreelancer(id, createFreelancerDto);
  }

  @Get('testing')
  @Activated(true)
  @UseGuards(JwtAuthGuard, ActivatedGuard, RolesGuard)
  @Roles(UserRole.Freelancer)
  testing(@Auth() { id }: JwtPayloadDto) {
    return id;
  }
}
