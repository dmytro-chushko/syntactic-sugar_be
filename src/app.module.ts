import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/modules/user/user.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { entities } from 'src/database/index';
import { MailModule } from 'src/modules/mail/mail.module';
import { EmployerModule } from 'src/modules/employer/employer.module';
import { FreelancerModule } from 'src/modules/freelancer/freelancer.module';
import { JobsModule } from 'src/modules/jobs/jobs.module';
import { CategoriesModule } from 'src/modules/categories/categories.module';
import { SkillsModule } from 'src/modules/skills/skills.module';
import { CountriesModule } from 'src/modules/countries/countries.module';
import { ProposalsModule } from 'src/modules/proposals/proposals.module';
import { FilesModule } from 'src/modules/files/files.module';
import { InvitationModule } from 'src/modules/invitation/invitation.module';
import { ChatModule } from 'src/modules/chat/chat.module';
import { MessageModule } from 'src/modules/message/message.module';
import { GatewayModule } from 'src/modules/gateway/gateway.module';
import { OfferModule } from 'src/modules/offer/offer.module';
import { NotificationModule } from './modules/notification/notification.module';

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
    EmployerModule,
    JwtModule,
    FreelancerModule,
    JobsModule,
    CategoriesModule,
    SkillsModule,
    CountriesModule,
    ProposalsModule,
    FilesModule,
    InvitationModule,
    ChatModule,
    MessageModule,
    GatewayModule,
    OfferModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
