import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/modules/user/user.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { entities } from 'src/database';
import { MailModule } from './modules/mail/mail.module';
import { FreelancerModule } from './modules/freelancer/freelancer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      entities: entities,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    MailModule,
    FreelancerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
