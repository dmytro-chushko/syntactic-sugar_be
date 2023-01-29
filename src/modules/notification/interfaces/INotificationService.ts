import { User, Notification } from 'src/database/entities';
import { CreateNotificationDto } from 'src/modules/notification/dto/createNotificationDto';

export interface INotificationService {
  createMessageNotification: (createNotificationDto: CreateNotificationDto) => void;
  getNotificationsByProfile(user: User): Promise<Notification[]>;
  getNotificationsByRole(id: string, role: string): Promise<Notification[]>;
}
