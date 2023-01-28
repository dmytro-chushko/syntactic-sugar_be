import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification, User } from 'src/database/entities';
import { IMessageService } from 'src/modules/message/interfaces/IMessageService';
import { MessageService } from 'src/modules/message/services/message.service';
import { INotificationService } from 'src/modules/notification/interfaces/INotificationService';
import { NotificationType, UserRoles } from 'src/utils/constants';
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

  async getNotificationsByProfile(user: User, id: string): Promise<Notification[]> {
    try {
      if (user.role === UserRoles.EMPLOYER) {
        return await this.notificationRepository
          .createQueryBuilder('notification')
          .leftJoinAndSelect('notification.message', 'message')
          .leftJoinAndSelect('message.chat', 'chat')
          .leftJoinAndSelect('chat.employer', 'employer')
          .where('employer.id = :id', { id })
          .andWhere('notification.isNew = :new', { new: true })
          .getMany();
      } else {
        return await this.notificationRepository
          .createQueryBuilder('notification')
          .leftJoinAndSelect('notification.message', 'message')
          .leftJoinAndSelect('message.chat', 'chat')
          .leftJoinAndSelect('chat.freelancer', 'freelancer')
          .where('freelancer.id = :id', { id })
          .andWhere('notification.isNew = :new', { new: true })
          .getMany();
      }
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
