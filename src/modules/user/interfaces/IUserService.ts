import { User } from 'src/database/entities/users.entity';
import { AuthUserDto } from '../../auth/dtos/authUser.dto';

export interface IUserService {
  createUser(registerUserDto: AuthUserDto): Promise<User>;
  getUserById(userId: string): Promise<User>;
  getUserByEmail(userEmail: string): Promise<User>;
  createGoogleUser(createGoogleUserDto): Promise<User | null>;
}
