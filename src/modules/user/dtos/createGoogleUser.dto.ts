import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGoogleUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
