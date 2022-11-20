import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  token: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
