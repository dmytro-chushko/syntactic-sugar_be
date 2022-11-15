import { Module } from '@nestjs/common';
import { MailModule } from 'src/modules/mail/mail.module';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetPasswordController } from './reset-password.controller';
import { User } from 'src/database/entities/users.entity';
import { ResetPasswordService } from './reset-password.service';

@Module({
  imports: [MailModule, AuthModule, TypeOrmModule.forFeature([User])],
  controllers: [ResetPasswordController],
  providers: [ResetPasswordService],
})
export class ResetPasswordModule {}
