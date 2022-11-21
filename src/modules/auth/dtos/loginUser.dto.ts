import { Exclude } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsEmail()
  readonly email: string;
  @Exclude()
  @IsString()
  readonly password: string;
  constructor(partial: Partial<LoginUserDto>) {
    Object.assign(this, partial);
  }
}
