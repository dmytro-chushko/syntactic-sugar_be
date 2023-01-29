import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User, Notification } from 'src/database/entities';
import { ActivatedGuard } from 'src/modules/auth/guards/activated.guard';
import { AuthJwtGuard } from 'src/modules/auth/guards/authJwt.guard';
import { RolesGuard } from 'src/modules/auth/guards/role.guard';
import { Routes, Services } from 'src/utils/constants';
import { Auth } from 'src/utils/decorators/auth';
import { INotificationService } from 'src/modules/notification/interfaces/INotificationService';

@Controller('notification')
export class NotificationController {
  constructor(@Inject(Services.NOTIFICATION) private notificationService: INotificationService) {}
  @ApiOperation({ summary: 'Get chat notifications' })
  @ApiHeader({ name: 'Authorization', description: 'Bearer token' })
  @ApiResponse({ status: 200, description: 'Get chat notifications by profile' })
  @Get(Routes.GET_NOTIFICATIONS_BY_PROFILE)
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  getNotificationsByProfile(@Auth() user: User): Promise<Notification[]> {
    return this.notificationService.getNotificationsByProfile(user);
  }
}
