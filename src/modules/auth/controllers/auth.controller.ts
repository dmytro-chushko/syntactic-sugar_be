import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IAuthService } from 'src/modules/auth/interfaces/IAuthService';
import { AuthUserDto } from 'src/modules/auth/dtos/authUser.dto';
import { ConfirmAccountDto, ForgotPasswordDto } from 'src/modules/auth/dtos';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenDto } from 'src/modules/auth/dtos/token.dto';
import { ResetPasswordDto } from 'src/modules/auth/dtos/resetPassword.dto';
import { IToken } from 'src/modules/auth/interfaces/IToken';
import { AddRoleDto } from 'src/modules/user/dtos/addRole.dto';
import { ActivatedGuard } from 'src/modules/auth/guards/activated.guard';
import { AuthJwtGuard } from 'src/modules/auth/guards/authJwt.guard';
import { ITokenAndRole } from 'src/modules/auth/interfaces/ITokenAndRole';
import { Auth } from 'src/utils/decorators/auth';
import { User } from 'src/database/entities/users.entity';

@ApiTags('auth')
@Controller(Routes.AUTH)
export class AuthController {
  constructor(@Inject(Services.AUTH) private authService: IAuthService) {}

  @ApiBody({ type: AuthUserDto })
  @ApiResponse({ status: 200, description: 'insert user to db' })
  @Post(Routes.REGISTER)
  @UsePipes(ValidationPipe)
  register(@Body() createUserDto: AuthUserDto): Promise<ITokenAndRole> {
    return this.authService.registration(createUserDto);
  }

  @ApiQuery({ name: 'id' })
  @ApiResponse({
    status: 200,
    description: 'updated field isActivated=true for user',
  })
  @Get(Routes.CONFIRM)
  confirm(@Query(ValidationPipe) query: ConfirmAccountDto): Promise<void> {
    return this.authService.confirmEmail(query.id);
  }

  @ApiBody({ type: AuthUserDto })
  @ApiResponse({ status: 200, description: 'Login user' })
  @Post(Routes.LOGIN)
  @UsePipes(ValidationPipe)
  @UseGuards(ActivatedGuard)
  login(@Body() authUserDto: AuthUserDto): Promise<ITokenAndRole> {
    return this.authService.login(authUserDto);
  }

  @ApiBody({ type: TokenDto })
  @ApiResponse({ status: 200, description: 'Login user' })
  @Post(Routes.GOOGLE_LOGIN)
  @UsePipes(ValidationPipe)
  loginByGoogle(@Body('token') token: string): Promise<ITokenAndRole> {
    return this.authService.loginByGoogle(token);
  }

  @ApiResponse({ status: 200, description: 'Email has been sent' })
  @Post(Routes.FORGOT_PASS)
  forgotPassword(@Body() forgotPasswordDTO: ForgotPasswordDto): Promise<void> {
    return this.authService.forgotPassword(forgotPasswordDTO.email);
  }

  @ApiResponse({ status: 200, description: 'Your password has updated' })
  @Post(Routes.RESET_PASS)
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

  @ApiBody({ type: AddRoleDto })
  @ApiResponse({ status: 200, description: 'Role added' })
  @UsePipes(ValidationPipe)
  @UseGuards(AuthJwtGuard)
  @Post('role')
  addUserRole(@Body() roleDto: AddRoleDto, @Auth() user: User): Promise<ITokenAndRole> {
    return this.authService.addUserRole(user.id, roleDto.role);
  }
}
