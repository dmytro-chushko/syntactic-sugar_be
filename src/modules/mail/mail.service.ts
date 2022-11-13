import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IMailService } from './interfaces';

@Injectable()
export class MailService implements IMailService {
  constructor(private mailer: MailerService) {}

  async sendActivationMail(to: string, link: string) {
    try {
      await this.mailer.sendMail({
        to,
        from: process.env.EMAIL_SENDER,
        subject: process.env.EMAIL_SUBJECT,
        text: 'Hello!',
        html: `
                <div>
                    <h1>Please, follow the link below to reset your password</h1>
                    <a href="${link}">${link}</a>
                </div>
              `,
      });
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
