import { Message } from 'src/database/entities';
import { CreateMessageDto } from '../dto/createMessage.dto';

export interface IMessageService {
  createMessage(createMessageDto: CreateMessageDto): Promise<Message>;
  getChatMessages(id: string): Promise<Message[]>;
}
