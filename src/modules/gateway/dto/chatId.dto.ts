import { IsString } from 'class-validator';

export class ChatIdDto {
  @IsString()
  chatId: string;
}
