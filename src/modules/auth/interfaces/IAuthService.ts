import { CreateUserDto } from '../../user/dtos/createUser.dto';

export interface IAuthService {
  registration(createUserDto: CreateUserDto);
}
