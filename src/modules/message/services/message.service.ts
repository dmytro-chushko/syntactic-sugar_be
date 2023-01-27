import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from 'src/database/entities';
import { IChatService } from 'src/modules/chat/interfaces/IChatService';
import { Services } from 'src/utils/constants';
import { CreateMessageDto } from 'src/modules/message/dto/createMessage.dto';
import { IMessageService } from 'src/modules/message/interfaces/IMessageService';
import { INotificationService } from 'src/modules/notification/interfaces/INotificationService';
import { NotificationService } from 'src/modules/notification/services/notification.service';

@Injectable()
export class MessageService implements IMessageService {
  constructor(
    @InjectRepository(Message) private readonly messageRepository: Repository<Message>,
    @Inject(Services.CHAT) private readonly chatService: IChatService,
    @Inject(forwardRef(() => NotificationService))
    private readonly notificationService: INotificationService,
  ) {}

  async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    try {
      const chat = await this.chatService.getChatById({ id: createMessageDto.chatId });
      const message = await this.messageRepository.create({
        text: createMessageDto.text,
        sender: createMessageDto.sender,
        chat,
      });

      const createdMessage = await this.messageRepository.save(message);
      console.log(createdMessage.id);
      this.notificationService.createMessageNotification({ messageId: createdMessage.id });

      return createdMessage;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getMessageById(id: string): Promise<Message> {
    return this.messageRepository.findOneBy({ id });
  }

  async getChatMessages(id: string): Promise<Message[]> {
    try {
      const messages = await this.messageRepository.find({
        where: { chat: { id } },
        order: { createdAt: 'ASC' },
      });

      return messages;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
