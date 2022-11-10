import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IUserService } from 'src/modules/user/interfaces/IUserService';
import { IAuthService } from 'src/modules/auth/interfaces/IAuthService';
import { CreateUserDto } from 'src/modules/user/dtos/createUser.dto';
import { ConfirmAccountDto } from 'src/modules/auth/dtos/confirmAccont.dto';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USER) private userService: IUserService,
  ) {}

  @Post(Routes.REGISTER)
  @UsePipes(ValidationPipe)
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto);
  }

  @Get(Routes.CONFIRM)
  confirm(@Query(ValidationPipe) query: ConfirmAccountDto) {
    return this.authService.confirmEmail(query.id);
  }
}
