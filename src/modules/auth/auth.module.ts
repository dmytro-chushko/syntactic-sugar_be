import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from 'src/modules/auth/controllers/auth.controller';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { UserModule } from 'src/modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/users.entity';
import { MailModule } from 'src/modules/mail/mail.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Services } from 'src/utils/constants';
import { TokenService } from 'src/modules/auth/services/token.service';
import { JwtStrategy } from 'src/modules/auth/strategies/jwtStrategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
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
  providers: [
    { provide: Services.AUTH, useClass: AuthService },
    { provide: Services.TOKEN, useClass: TokenService },
    JwtStrategy,
    JwtService,
  ],
  exports: [
    JwtModule,
    {
      provide: Services.TOKEN,
      useClass: TokenService,
    },
  ],
})
export class AuthModule {}
