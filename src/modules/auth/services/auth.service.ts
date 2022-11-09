import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAuthService } from '../interfaces/IAuthService';
import { CreateUserDto } from '../../user/dtos/createUser.dto';
import { Services } from '../../../utils/constants';
import { IUserService } from '../../user/interfaces/IUserService';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../database/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USER) private readonly userService: IUserService,
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
    return this.userService.createUser(createUserDto);
  }
}
