import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { Services } from '../../utils/constants';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../database/entities/users.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [UserModule, MailModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [{ provide: Services.AUTH, useClass: AuthService }],
})
export class AuthModule {}
