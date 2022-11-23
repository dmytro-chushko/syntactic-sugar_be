import { AuthUserDto } from 'src/modules/auth/dtos/authUser.dto';
import { User } from 'src/database/entities/users.entity';
import { ConfirmAccountDto } from '../dtos/confirmAccount.dto';

export interface IAuthService {
  registration(registerUserDto: AuthUserDto);
  login(loginUserDto: AuthUserDto);
  sendConfirmation(user: User);
  confirmEmail(userId: ConfirmAccountDto);
  signupGoogle(token: string);
}
