import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification, User } from 'src/database/entities';
import { IEmployerService } from 'src/modules/employer/interfaces/IEmployerService';
import { IFreelancerService } from 'src/modules/freelancer/interfaces/IFreelancerService';
import { Role } from 'src/modules/gateway/dto/notification.dto';
import { IMessageService } from 'src/modules/message/interfaces/IMessageService';
import { MessageService } from 'src/modules/message/services/message.service';
import { INotificationService } from 'src/modules/notification/interfaces/INotificationService';
import { NotificationType, Services, UserRoles } from 'src/utils/constants';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from 'src/modules/notification/dto/createNotificationDto';

@Injectable()
export class NotificationService implements INotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @Inject(forwardRef(() => MessageService)) private readonly messageService: IMessageService,
    @Inject(Services.FREELANCER) private readonly freelancerService: IFreelancerService,
    @Inject(Services.EMPLOYER) private readonly employerService: IEmployerService,
  ) {}

  async createMessageNotification(createNotificationDto: CreateNotificationDto): Promise<void> {
    try {
      const message = await this.messageService.getMessageById(createNotificationDto.messageId);
      const notification = this.notificationRepository.create({
        type: NotificationType.MESSAGE,
        message,
        isNew: true,
      });

      await this.notificationRepository.save(notification);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getNotificationsByProfile(user: User): Promise<Notification[]> {
    try {
      if (user.role === UserRoles.EMPLOYER) {
        const employer = await this.employerService.getEmployer(user);

        return await this.notificationRepository
          .createQueryBuilder('notification')
          .leftJoinAndSelect('notification.message', 'message')
          .leftJoinAndSelect('message.chat', 'chat')
          .leftJoinAndSelect('chat.employer', 'employer')
          .where('employer.id = :id', { id: employer.id })
          .andWhere('notification.isNew = :new', { new: true })
          .getMany();
      } else {
        const freelancer = await this.freelancerService.getProfile(user);

        return await this.notificationRepository
          .createQueryBuilder('notification')
          .leftJoinAndSelect('notification.message', 'message')
          .leftJoinAndSelect('message.chat', 'chat')
          .leftJoinAndSelect('chat.freelancer', 'freelancer')
          .where('freelancer.id = :id', { id: freelancer.id })
          .andWhere('notification.isNew = :new', { new: true })
          .getMany();
      }
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getNotificationsByRole(id: string, role: string): Promise<Notification[]> {
    try {
      if (role === Role.EMPLOYER) {
        const employer = await this.employerService.getEmployerById(id);

        return await this.notificationRepository
          .createQueryBuilder('notification')
          .leftJoinAndSelect('notification.message', 'message')
          .leftJoinAndSelect('message.chat', 'chat')
          .leftJoinAndSelect('chat.employer', 'employer')
          .where('employer.id = :id', { id: employer.id })
          .andWhere('notification.isNew = :new', { new: true })
          .getMany();
      } else {
        const freelancer = await this.freelancerService.getFreelancerById(id);

        return await this.notificationRepository
          .createQueryBuilder('notification')
          .leftJoinAndSelect('notification.message', 'message')
          .leftJoinAndSelect('message.chat', 'chat')
          .leftJoinAndSelect('chat.freelancer', 'freelancer')
          .where('freelancer.id = :id', { id: freelancer.id })
          .andWhere('notification.isNew = :new', { new: true })
          .getMany();
      }
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
