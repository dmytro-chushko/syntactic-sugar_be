import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAuthService } from '../interfaces/IAuthService';
import { CreateUserDto } from '../../user/dtos/createUser.dto';
import { Services } from '../../../utils/constants';
import { IUserService } from '../../user/interfaces/IUserService';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../database/entities/users.entity';
import { Repository } from 'typeorm';
import { MailService } from '../../mail/services/mail.service';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USER) private readonly userService: IUserService,
    @Inject(Services.MAIL) private readonly mailService: MailService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async registration(createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new HttpException(
        `user with such email ${createUserDto.email} exists`,
        HttpStatus.CONFLICT,
      );
    }
    const user = await this.userService.createUser(createUserDto);
    await this.sendConfirmation(user);
  }

  async sendConfirmation(user: User) {
    const confirmLink = `http://localhost:4000/auth/confirm?token=${user.id}`;
    await this.mailService.sendActivationMail(user.email, confirmLink);
  }
}
