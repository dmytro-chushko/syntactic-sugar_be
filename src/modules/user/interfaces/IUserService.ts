import { User } from '../../../database/entities/users.entity';

export interface IUserService {
  findByEmail(email: string): Promise<User | null>;
}
