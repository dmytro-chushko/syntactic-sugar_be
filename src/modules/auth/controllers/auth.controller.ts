import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Routes, Services, UserRoles } from 'src/utils/constants';
import { IUserService } from 'src/modules/user/interfaces/IUserService';
import { IAuthService } from 'src/modules/auth/interfaces/IAuthService';
import { AuthUserDto } from 'src/modules/auth/dtos/authUser.dto';
import { ConfirmAccountDto, ForgotPasswordDto } from 'src/modules/auth/dtos';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenDto } from 'src/modules/auth/dtos/token.dto';
import { ResetPasswordDto } from 'src/modules/auth/dtos/resetPassword.dto';
import { IToken } from 'src/modules/auth/interfaces/IToken';
import { AddRoleDto } from 'src/modules/user/dtos/addRole.dto';
import { Roles } from 'src/utils/decorators/roles';
import { ActivatedGuard } from 'src/modules/auth/guards/activated.guard';
import { AuthJwtGuard } from 'src/modules/auth/guards/authJwt.guard';

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
  register(@Body() createUserDto: AuthUserDto): Promise<IToken> {
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
  login(@Body() authUserDto: AuthUserDto): Promise<IToken> {
    return this.authService.login(authUserDto);
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
  // eslint-disable-next-line prettier/prettier
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

  @ApiBody({ type: AddRoleDto })
  @ApiResponse({ status: 200, description: 'Role added' })
  @UsePipes(ValidationPipe)
  // For example how does AuthRolesGuard works
  @Roles(UserRoles.JOB_OWNER)
  @UseGuards(AuthJwtGuard)
  @Post('role/:id')
  addUserRole(@Body() roleDto: AddRoleDto, @Param('id') userId: string): Promise<IToken> {
    return this.authService.addUserRole(userId, roleDto.role);
  }
}
