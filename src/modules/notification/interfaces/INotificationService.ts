import { CreateNotificationDto } from 'src/modules/notification/dto/createNotificationDto';

export interface INotificationService {
  createMessageNotification: (createNotificationDto: CreateNotificationDto) => void;
}
