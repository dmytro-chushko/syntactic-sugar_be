import { Chat, Message, User } from 'src/database/entities';
import { CreateChatDto } from '../dto/createChat.dto';
import { GetChatByIdDto } from '../dto/getChatById.dto';

export interface IChatService {
  createChat(createChatDto: CreateChatDto): Promise<Chat>;
  getChatById(getChatByIdDto: GetChatByIdDto): Promise<Chat>;
  getChatMessages(id: string): Promise<Message[]>;
  getChatsByUser(user: User): Promise<Chat[]>;
}
