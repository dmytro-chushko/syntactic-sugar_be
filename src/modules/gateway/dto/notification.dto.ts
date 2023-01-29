import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum Role {
  FREELANCER = 'freelancer',
  EMPLOYER = 'employer',
}

export class NotificationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
