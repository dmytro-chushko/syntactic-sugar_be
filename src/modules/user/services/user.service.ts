import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/users.entity';
import { IUserService } from 'src/modules/user/interfaces/IUserService';
import { AuthUserDto } from 'src/modules/auth/dtos/authUser.dto';
import { hashPassword } from 'src/utils/hash';
import { UserRoles } from 'src/utils/constants';

@Injectable()
export class UserService implements IUserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
  async createUser(createUserDto: AuthUserDto): Promise<User> {
    try {
      const password = await hashPassword(createUserDto.password);
      const newUser = this.userRepository.create({
        ...createUserDto,
        password,
      });

      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOneBy({ email: email });

      return user;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      return await this.userRepository
        .createQueryBuilder('user')
        .select(['user.id'])
        .leftJoinAndSelect('user.freelancer', 'freelancer')
        .leftJoinAndSelect('user.employer', 'employer')
        .where('user.id = :id', { id })
        .getOne();
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createGoogleUser(email: string): Promise<User> {
    try {
      const newUser = this.userRepository.create({ email });

      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async changeRole(user: User, role: UserRoles): Promise<void> {
    try {
      user.role = role;
      await this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
