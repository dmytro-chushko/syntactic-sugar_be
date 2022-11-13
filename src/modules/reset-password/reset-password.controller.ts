import { Controller, Body, Post } from '@nestjs/common';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordService } from './reset-password.service';
import { Result } from './types';

@Controller('resetpassword')
export class ResetPasswordController {
  constructor(private resetPasswordService: ResetPasswordService) {}

  @Post()
  forgotPassword(@Body() forgotPasswordDTO: ForgotPasswordDto): Promise<Result> {
    return this.resetPasswordService.forgotPassword(forgotPasswordDTO);
  }
}
