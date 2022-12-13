import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserModule } from 'src/modules/user/user.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { entities } from 'src/database/index';
import { MailModule } from 'src/modules/mail/mail.module';
import { EmployerModule } from 'src/modules/employer/employer.module';
import { JwtModule } from '@nestjs/jwt';
import { FreelancerModule } from './modules/freelancer/freelancer.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { SkillsModule } from './modules/skills/skills.module';
import { CountriesModule } from './modules/countries/countries.module';
import { ProposalsModule } from './modules/proposals/proposals.module';
import { FilesModule } from './modules/files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'modules/files/static'),
      // rootPath: path.join(__dirname, '..', 'static'),
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
