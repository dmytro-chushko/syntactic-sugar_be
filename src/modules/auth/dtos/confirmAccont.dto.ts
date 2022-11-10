import { IsNotEmpty } from 'class-validator';

export class ConfirmAccountDto {
  @IsNotEmpty()
  id: string;
}
