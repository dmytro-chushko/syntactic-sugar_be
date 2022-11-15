import { Controller, Body, Post } from '@nestjs/common';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordService } from './reset-password.service';

@Controller('resetpassword')
export class ResetPasswordController {
  constructor(private resetPasswordService: ResetPasswordService) {}

  @Post()
  forgotPassword(@Body() forgotPasswordDTO: ForgotPasswordDto): Promise<boolean> {
    return this.resetPasswordService.forgotPassword(forgotPasswordDTO);
  }
}
