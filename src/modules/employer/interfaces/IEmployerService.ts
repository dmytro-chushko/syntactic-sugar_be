import { User } from 'src/database/entities/users.entity';
import { IToken } from 'src/modules/auth/interfaces/IToken';
import { CreateEmployerDto } from 'src/modules/employer/dtos/createEmployer.dto';

export interface IEmployerService {
  createEmployer(user: User, createEmployerDto: CreateEmployerDto): Promise<IToken>;
}
