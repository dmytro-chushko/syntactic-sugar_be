import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  //add size check for password , don`t do it now cause its should be easier for testing
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
