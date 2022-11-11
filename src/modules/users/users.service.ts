import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.create(userDto);
      await this.userRepository.save(user);
      return user;
    } catch (err) {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllUser(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (err) {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      return user;
    } catch (err) {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUser(id: string, userDto: CreateUserDto): Promise<User> {
    try {
      await this.userRepository.update({ id }, { ...userDto });
      const user = await this.userRepository.findOneBy({ id });
      return user;
    } catch (err) {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUser(id: string): Promise<string> {
    try {
      await this.userRepository.delete({ id });
      return `User ${id} has been deleted`;
    } catch (err) {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user.email= :userEmail', { userEmail: email })
        .getOne();
      return user;
    } catch (err) {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
