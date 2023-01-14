import { Employer } from 'src/database/entities/employer.entity';
import { User } from 'src/database/entities/users.entity';
import { ITokenAndRole } from 'src/modules/auth/interfaces/ITokenAndRole';
import { CreateEmployerDto } from 'src/modules/employer/dtos/createEmployer.dto';

export interface IEmployerService {
  createEmployer(user: User, createEmployerDto: CreateEmployerDto): Promise<ITokenAndRole>;
  getEmployer(user: User): Promise<Employer | null>;
  getEmployerById(id: string): Promise<Employer | null>;
}
