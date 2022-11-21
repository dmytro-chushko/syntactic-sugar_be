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
import { ConfirmAccountDto, ForgotPasswordDto } from 'src/modules/auth/dtos';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenDto } from '../dtos/token.dto';
import { ResetPasswordDto } from '../dtos/resetPassword.dto';
import { IToken } from '../interfaces/IToken';

@ApiTags('auth')
@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USER) private userService: IUserService,
  ) {}

  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, description: 'insert user to db' })
  @Post(Routes.REGISTER)
  @UsePipes(ValidationPipe)
  register(@Body() createUserDto: CreateUserDto): Promise<IToken> {
    return this.authService.registration(createUserDto);
  }

  @ApiQuery({ name: 'id' })
  @ApiResponse({
    status: 200,
    description: 'updated field isActivated=true for user',
  })
  @Get(Routes.CONFIRM)
  confirm(@Query(ValidationPipe) query: ConfirmAccountDto): Promise<IToken> {
    return this.authService.confirmEmail(query.id);
  }

  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, description: 'Login user' })
  @Post(Routes.LOGIN)
  @UsePipes(ValidationPipe)
  login(@Body() userDto: CreateUserDto): Promise<IToken> {
    return this.authService.login(userDto);
  }

  @ApiBody({ type: TokenDto })
  @ApiResponse({ status: 200, description: 'Login user' })
  @Post(Routes.GOOGLE_LOGIN)
  @UsePipes(ValidationPipe)
  loginByGoogle(@Body('token') token: string): Promise<IToken> {
    return this.authService.loginByGoogle(token);
  }

  @ApiResponse({ status: 200, description: 'Email has been sent' })
  @Post(Routes.FORGOT_PASS)
  forgotPassword(@Body() forgotPasswordDTO: ForgotPasswordDto): Promise<boolean> {
    return this.authService.forgotPassword(forgotPasswordDTO.email);
  }

  @ApiResponse({ status: 200, description: 'Your password has updated' })
  @Post('resetpassword')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<boolean> {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @ApiBody({ type: TokenDto })
  @ApiResponse({ status: 200, description: 'Registered with Google' })
  @Post(Routes.SIGNUP_GOOGLE)
  @UsePipes(ValidationPipe)
  signupGoogle(@Body('token') token: string): Promise<IToken> {
    return this.authService.signupGoogle(token);
  }
}
