import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { User } from '../../database/entities/users.entity';
import { UserService } from './services/user.service';
import { Services } from '../../utils/constants';

@Module({
  controllers: [UserController],
  providers: [{ provide: Services.USER, useClass: UserService }],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [
    {
      provide: Services.USER,
      useClass: UserService,
    },
  ],
})
export class UserModule {}
