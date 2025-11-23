import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get(':userId')
  async getNotificationsByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    const notifications = await this.notificationService.findLogsByUser(userId);

    if (notifications.length === 0) {
      return {
        message: `No notifications found for user ${userId}.`,
        notifications: [],
      };
    }

    return notifications;
  }
}
