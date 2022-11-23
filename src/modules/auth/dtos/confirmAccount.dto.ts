import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmAccountDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
