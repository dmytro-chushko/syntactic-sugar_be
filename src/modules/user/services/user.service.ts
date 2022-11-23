import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/users.entity';
import { IUserService } from 'src/modules/user/interfaces/IUserService';
import { AuthUserDto } from 'src/modules/auth/dtos/authUser.dto';
import { hashPassword } from 'src/utils/hash';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async createUser(registerUserDto: AuthUserDto): Promise<User> {
    try {
      const password = await hashPassword(registerUserDto.password);
      const newUser = this.userRepository.create({
        ...registerUserDto,
        password,
      });

      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserById(userId: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id: userId });

    return user;
  }

  async getUserByEmail(userEmail: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email: userEmail });

    return user;
  }

  async createGoogleUser(email: string): Promise<User> {
    try {
      const newUser = this.userRepository.create({ email });

      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
