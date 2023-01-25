import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IUserService } from 'src/modules/user/interfaces/IUserService';
import { User } from 'src/database/entities';
import { ApiResponse } from '@nestjs/swagger';
import { ActivatedGuard } from 'src/modules/auth/guards/activated.guard';
import { AuthJwtGuard } from 'src/modules/auth/guards/authJwt.guard';
import { Auth } from 'src/utils/decorators/auth';

@Controller(Routes.USER)
export class UserController {
  constructor(@Inject(Services.USER) private userService: IUserService) {}
  @ApiResponse({ status: 201, description: 'Current user' })
  @Get(Routes.CURRENT_USER)
  @UseGuards(AuthJwtGuard, ActivatedGuard)
  getCurrentUser(@Auth() user: User): Promise<User> {
    return this.userService.findById(user.id);
  }
}
