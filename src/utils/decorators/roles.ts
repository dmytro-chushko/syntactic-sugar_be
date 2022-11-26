import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY, UserRoles } from 'src/utils/constants';

export const Roles = (role: UserRoles) => SetMetadata(ROLES_KEY, role);
