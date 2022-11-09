import { User } from '../../../database/entities/users.entity';

export interface IUserService {
  createUser(createUserDto): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}
