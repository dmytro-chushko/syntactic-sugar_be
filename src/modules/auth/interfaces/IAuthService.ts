import { AuthUserDto } from 'src/modules/auth/dtos/authUser.dto';
import { User } from 'src/database/entities/users.entity';
import { ResetPasswordDto } from 'src/modules/auth/dtos/resetPassword.dto';
import { UserRoles } from 'src/utils/constants';
import { IToken } from 'src/modules/auth/interfaces/IToken';
import { ITokenAndRole } from './ITokenAndRole';

export interface IAuthService {
  registration(authUserDto: AuthUserDto): Promise<IToken>;
  login(authUserDto: AuthUserDto): Promise<ITokenAndRole>;
  sendConfirmation(user: User): Promise<void>;
  confirmEmail(id: string): Promise<void>;
  forgotPassword(email: string);
  resetPassword(resetPasswordDto: ResetPasswordDto);
  signupGoogle(token: string);
  loginByGoogle(token: string);
  addUserRole(id: string, role: UserRoles): Promise<IToken>;
}
