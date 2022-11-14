import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { User } from 'src/database/entities/users.entity';
import { UserService } from 'src/modules/user/services/user.service';
import { Services } from 'src/utils/constants';

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
