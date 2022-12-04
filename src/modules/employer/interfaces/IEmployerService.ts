import { CreateEmployerDto } from 'src/modules/employer/dtos/createEmployer.dto';
import { User } from 'src/database/entities/users.entity';
import { Employer } from 'src/database/entities/employer.entity';

export interface IEmployerService {
  createEmployer(user: User, createEmployerDto: CreateEmployerDto): Promise<Employer>;
  findEmployer(user: User): Promise<Employer | null>;
}
