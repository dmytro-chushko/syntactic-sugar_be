import { UserRoles } from 'src/utils/constants';

export interface IToken {
  token: string;
}

export interface IPayload {
  id: string;
  email: string;
  role: UserRoles;
}
