import { Body, Controller, Inject, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/database/entities/users.entity';
import { Routes, Services } from 'src/utils/constants';
import { AddRoleDto } from 'src/modules/user/dtos/addRole.dto';
import { IUserService } from 'src/modules/user/interfaces/IUserService';

@Controller(Routes.USER)
export class UserController {
  constructor(@Inject(Services.USER) private userService: IUserService) {}

  @ApiBody({ type: AddRoleDto })
  @ApiResponse({ status: 200, description: 'Role added' })
  @UsePipes(ValidationPipe)
  @Post('role/:id')
  addUserRole(@Body() roleDto: AddRoleDto, @Param('id') userId: string): Promise<User> {
    return this.userService.addUserRole(userId, roleDto.role);
  }
}
