import { Chat, Message, User } from 'src/database/entities';
import { CreateChatDto } from 'src/modules/chat/dto/createChat.dto';
import { GetChatByIdDto } from 'src/modules/chat/dto/getChatById.dto';

export interface IChatService {
  createChat(createChatDto: CreateChatDto): Promise<Chat>;
  getChatById(getChatByIdDto: GetChatByIdDto): Promise<Chat>;
  getChatMessages(id: string): Promise<Message[]>;
  getChatsByUser(user: User): Promise<Chat[]>;
}
