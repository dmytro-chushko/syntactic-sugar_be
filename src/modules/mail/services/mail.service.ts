import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IMailService } from 'src/modules/mail/interfaces/IMailService';

@Injectable()
export class MailService implements IMailService {
  constructor(private mailer: MailerService) {}

  async sendActivationMail(to: string, html: string) {
    try {
      await this.mailer.sendMail({
        to,
        from: process.env.EMAIL_USER,
        subject: process.env.EMAIL_SUBJECT,
        text: 'some text',
        html,
      });
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
