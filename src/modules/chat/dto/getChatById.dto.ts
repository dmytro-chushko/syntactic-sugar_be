import { IsNotEmpty, IsString } from 'class-validator';

export class GetChatByIdDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
