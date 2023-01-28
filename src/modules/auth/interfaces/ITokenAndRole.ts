import { UserRoles } from 'src/utils/constants';

export interface ITokenAndRole {
  token: string;
  role: UserRoles;
  profile?: boolean;
}
