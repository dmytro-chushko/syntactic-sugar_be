import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { UserRoles } from 'src/utils/constants';

export class AddRoleDto {
  @ApiProperty()
  @IsString()
  @IsEnum(UserRoles)
  role: UserRoles;
}
