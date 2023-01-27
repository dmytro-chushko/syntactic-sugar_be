import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from 'src/database/entities';
import { IMessageService } from 'src/modules/message/interfaces/IMessageService';
import { MessageService } from 'src/modules/message/services/message.service';
import { INotificationService } from 'src/modules/notification/interfaces/INotificationService';
import { NotificationType } from 'src/utils/constants';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from '../dto/createNotificationDto';

@Injectable()
export class NotificationService implements INotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @Inject(forwardRef(() => MessageService)) private readonly messageService: IMessageService,
  ) {}

  async createMessageNotification(createNotificationDto: CreateNotificationDto): Promise<void> {
    try {
      const message = await this.messageService.getMessageById(createNotificationDto.messageId);
      const notification = this.notificationRepository.create({
        type: NotificationType.MESSAGE,
        message,
        isNew: true,
      });

      console.log(notification);
      const newNotification = await this.notificationRepository.save(notification);
      console.log(newNotification);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
