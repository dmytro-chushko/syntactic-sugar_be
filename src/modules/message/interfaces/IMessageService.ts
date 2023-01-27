import { Message } from 'src/database/entities';
import { CreateMessageDto } from 'src/modules/message/dto/createMessage.dto';

export interface IMessageService {
  createMessage(createMessageDto: CreateMessageDto): Promise<Message>;
  getChatMessages(id: string): Promise<Message[]>;
  getMessageById(id: string): Promise<Message>;
}
