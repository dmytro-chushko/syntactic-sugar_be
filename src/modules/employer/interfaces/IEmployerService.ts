import { CreateEmployerDto } from 'src/modules/employer/dtos/createEmployer.dto';

export interface IEmployerService {
  createEmployer(createEmployerDto: CreateEmployerDto);
}
