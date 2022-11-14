import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailService } from 'src/modules/mail/services/mail.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { User } from 'src/database/entities/users.entity';
import { Result } from './types';

const RESET_PASSWOPRD_LINK = 'http://localhost:4200/';

@Injectable()
export class ResetPasswordService {
  constructor(
    @InjectRepository(User) private resetPasswordRepository: Repository<User>,
    @Inject('MAIL_SERVICE') private mailService: MailService,
  ) {}

  async forgotPassword(forgotPasswordDTO: ForgotPasswordDto): Promise<Result> {
    try {
      const user = await this.resetPasswordRepository
        .createQueryBuilder('user')
        .where('user.email= :userEmail', { userEmail: forgotPasswordDTO.email })
        .getOne();
      if (!user) {
        throw new BadRequestException('Invalid mail');
      }
      await this.mailService.sendActivationMail(
        user.email,
        `${RESET_PASSWOPRD_LINK}resetpassword/${user.id}`,
      );
      const result = { id: user.id };

      return result;
    } catch (err) {
      if (err.status === 400) {
        throw new BadRequestException('Invalid mail');
      }
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
