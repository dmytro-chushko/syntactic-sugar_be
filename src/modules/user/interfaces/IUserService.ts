import { User } from 'src/database/entities/users.entity';
import { UserRoles } from 'src/utils/constants';

export interface IUserService {
  createUser(createUserDto): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  createGoogleUser(createGoogleUserDto): Promise<User | null>;
  changeRole(user: User, role: UserRoles): Promise<void>;
  getCurrentUser(id: string): Promise<User | null>;
}
