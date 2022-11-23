import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IUserService } from 'src/modules/user/interfaces/IUserService';
import { IAuthService } from 'src/modules/auth/interfaces/IAuthService';
import { AuthUserDto } from 'src/modules/auth/dtos/authUser.dto';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenDto } from '../dtos/token.dto';
import { User } from 'src/database/entities/users.entity';
import { Roles } from '../../../utils/decorators/roles';
import { RolesGuard } from '../guards/roleGuard';
import { JwtAuthGuard } from '../guards/jwtGuard';
import { UserRole } from '../../../database/entities/users.entity';
import { Activated } from '../../../utils/decorators/activated';
import { ActivatedGuard } from '../guards/activatedGuard';
import { ConfirmAccountDto } from '../dtos/confirmAccount.dto';

@ApiTags('auth')
@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USER) private userService: IUserService,
  ) {}

  @ApiBody({ type: AuthUserDto })
  @ApiResponse({ status: 200, description: 'insert user to db' })
  @Post(Routes.REGISTER)
  @UsePipes(ValidationPipe)
  register(@Body() registerUserDto: AuthUserDto) {
    return this.authService.registration(registerUserDto);
  }

  @Post(Routes.LOGIN)
  @UsePipes(ValidationPipe)
  login(@Body() loginUserDto: AuthUserDto) {
    return this.authService.login(loginUserDto);
  }

  @ApiQuery({ name: 'id' })
  @ApiResponse({
    status: 200,
    description: 'updated field isActivated=true for user',
  })
  @Get(Routes.CONFIRM)
  async confirm(@Query(ValidationPipe) query: ConfirmAccountDto) {
    return await this.authService.confirmEmail(query);
  }

  @ApiBody({ type: TokenDto })
  @ApiResponse({ status: 200, description: 'Registered with Google' })
  @Post(Routes.SIGNUP_GOOGLE)
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  signupGoogle(@Body('token') token: string): Promise<User> {
    return this.authService.signupGoogle(token);
  }

  //endpoint for testing , will be deleted in future
  @Get('test')
  @UseGuards(JwtAuthGuard, RolesGuard, ActivatedGuard)
  @Activated(true)
  @Roles(UserRole.Employer)
  test() {
    return true;
  }
}
