import { Module } from '@nestjs/common';
import { MailService } from './services/mail.service';
import { Services } from '../../utils/constants';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [{ provide: Services.MAIL, useClass: MailService }],
  exports: [
    {
      provide: Services.MAIL,
      useClass: MailService,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
    }),
  ],
})
export class MailModule {}
