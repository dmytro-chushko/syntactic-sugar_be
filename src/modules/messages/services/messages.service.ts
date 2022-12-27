import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/database/entities';
import { IChatService } from 'src/modules/chat/interfaces/IChatService';
import { Services } from 'src/utils/constants';
import { Repository } from 'typeorm';
import { CreateMessageDto } from '../dto/createMessage.dto';
import { IMessageService } from '../interfaces/IMessageService';

@Injectable()
export class MessagesService implements IMessageService {
  constructor(
    @InjectRepository(Message) private readonly messageRepository: Repository<Message>,
    @Inject(Services.CHAT) private readonly chatService: IChatService,
  ) {}

  async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    try {
      const chat = await this.chatService.getChatById({ id: createMessageDto.chatId });
      const message = await this.messageRepository.create({
        text: createMessageDto.text,
        sender: createMessageDto.sender,
        chat,
      });

      return message;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
