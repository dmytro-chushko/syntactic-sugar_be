import { IsDateString } from 'class-validator';
import { CreateMessageDto } from 'src/modules/messages/dto/createMessage.dto';

export class MessageDto extends CreateMessageDto {
  @IsDateString()
  createdAt: Date;
}
