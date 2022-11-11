import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { User } from 'src/modules/users/users.entity';

@Injectable()
export class ResetPasswordService {
  constructor(@InjectRepository(User) private resetPasswordRepository: Repository<User>) {}

  async forgotPassword(forgotPasswordDTO: ForgotPasswordDto): Promise<User> {
    try {
      const user = await this.resetPasswordRepository
        .createQueryBuilder('user')
        .where('user.email= :userEmail', { userEmail: forgotPasswordDTO.email })
        .getOne();
      if (!user) {
        throw new BadRequestException('Invalid mail');
      }
      return user;
    } catch (err) {
      if (err.status === 400) {
        throw new BadRequestException('Invalid mail');
      }
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
