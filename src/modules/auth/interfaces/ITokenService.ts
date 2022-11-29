import { IToken } from './IToken';
import { User } from 'src/database/entities/users.entity';

export interface ITokenService {
  generateToken(user: User): Promise<IToken>;
}
