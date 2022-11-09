import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../database/entities/users.entity';
import { IUserService } from '../interfaces/IUserService';
import { CreateUserDto } from '../dtos/createUser.dto';
import { hashPassword } from '../../../utils/hash';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const password = await hashPassword(createUserDto.password);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password,
    });
    return await this.userRepository.save(newUser);
  }

  async findByEmail(email: string) {
    const user = await this.userRepository
      .createQueryBuilder()
      .select('id')
      .from(User, 'id')
      .where({ email })
      .getOne();
    return user;
  }

  /*async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
      return user;
    } catch (err) {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }*/

  /*
  async findByEmail(email: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email= :userEmail', { userEmail: email })
      .getOne();
    return user;
  }*/

  /*
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
  }*/
}
