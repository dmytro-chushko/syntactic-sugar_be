import { IsEmail, IsString } from 'class-validator';

export class SignupGoogleUserDto {
  @IsString()
  @IsEmail()
  readonly email: string;
}
