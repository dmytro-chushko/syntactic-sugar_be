import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class JwtPayloadDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  role: string;
}
