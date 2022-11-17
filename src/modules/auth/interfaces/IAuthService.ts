import { CreateUserDto } from 'src/modules/user/dtos/createUser.dto';
import { User } from 'src/database/entities/users.entity';

export interface IAuthService {
  registration(createUserDto: CreateUserDto);
  sendConfirmation(user: User);
  confirmEmail(id: string);
  forgotPassword(email: string);
  signupGoogle(token: string);
}
