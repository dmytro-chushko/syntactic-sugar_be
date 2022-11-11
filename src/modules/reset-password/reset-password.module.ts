import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetPasswordController } from './reset-password.controller';
import { User } from 'src/modules/users/users.entity';
import { ResetPasswordService } from './reset-password.service';

@Module({
  controllers: [ResetPasswordController],
  providers: [ResetPasswordService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class ResetPasswordModule {}
