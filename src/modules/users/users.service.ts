import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(userDto: CreateUserDto) {
    const user = await this.userRepository.create(userDto);
    return this.userRepository.save(user);
  }

  async getAllUser() {
    const users = await this.userRepository.find();
    return users;
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async updateUser(id: string, userDto: CreateUserDto) {
    const user = await this.userRepository.update({ id }, { ...userDto });
    return user;
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.delete({ id });
    return user;
  }

  async getUserByEmail(email: string) {
    console.log(email);
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email= :userEmail', { userEmail: email })
      .getOne();
    console.log(user);
    return user;
  }
}
