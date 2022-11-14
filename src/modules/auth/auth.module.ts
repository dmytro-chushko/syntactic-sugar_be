import { Module } from '@nestjs/common';
import { AuthController } from 'src/modules/auth/controllers/auth.controller';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { Services } from 'src/utils/constants';
import { UserModule } from 'src/modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/users.entity';
import { MailModule } from 'src/modules/mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    MailModule,
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET_KEY',
      signOptions: {
        expiresIn: process.env.EXPIRES_IN || '24h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [{ provide: Services.AUTH, useClass: AuthService }],
})
export class AuthModule {}
