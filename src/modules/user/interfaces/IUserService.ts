import { User } from 'src/database/entities/users.entity';

export interface IUserService {
  createUser(createUserDto): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
