import { Module } from '@nestjs/common';
import { MailModule } from 'src/modules/mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetPasswordController } from './reset-password.controller';
import { User } from 'src/modules/users/users.entity';
import { ResetPasswordService } from './reset-password.service';

@Module({
  imports: [MailModule, TypeOrmModule.forFeature([User])],
  controllers: [ResetPasswordController],
  providers: [ResetPasswordService],
})
export class ResetPasswordModule {}
