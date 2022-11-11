import { Controller, Body, Post } from '@nestjs/common';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordService } from './reset-password.service';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

@Controller('resetpassword')
export class ResetPasswordController {
  constructor(private resetPasswordService: ResetPasswordService) {}

  @Post()
  forgotPassword(@Body() forgotPasswordDTO: ForgotPasswordDto): Promise<CreateUserDto> {
    return this.resetPasswordService.forgotPassword(forgotPasswordDTO);
  }
}
