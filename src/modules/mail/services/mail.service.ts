import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailer: MailerService) {}

  async sendActivationMail(to, link) {
    await this.mailer.sendMail({
      to,
      from: process.env.EMAIL_USER,
      subject: 'subject',
      text: 'some text',
      html: `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `,
    });
  }
}
