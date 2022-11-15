import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailService } from 'src/modules/mail/services/mail.service';
import { AuthService } from '../auth/services/auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { User } from 'src/database/entities/users.entity';

const RESET_PASSWOPRD_LINK = 'http://localhost:4200/';

@Injectable()
export class ResetPasswordService {
  constructor(
    @InjectRepository(User) private resetPasswordRepository: Repository<User>,
    @Inject('MAIL_SERVICE') private mailService: MailService,
    @Inject('AUTH_SERVICE') private authService: AuthService,
  ) {}

  async forgotPassword(forgotPasswordDTO: ForgotPasswordDto): Promise<boolean> {
    try {
      const user = await this.resetPasswordRepository
        .createQueryBuilder('user')
        .where('user.email= :userEmail', { userEmail: forgotPasswordDTO.email })
        .getOne();
      if (!user) {
        throw new BadRequestException('Invalid mail');
      }
      const token = await this.authService.generateToken(user);
      await this.mailService.sendActivationMail(
        user.email,
        `${RESET_PASSWOPRD_LINK}resetpassword/${token.token}`,
      );
      return true;
    } catch (err) {
      if (err.status === 400) {
        throw new BadRequestException('Invalid mail');
      }
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
