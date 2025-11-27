import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

interface NotificationLogData {
  user_id: string;
  message: string;
}

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async createLog(data: NotificationLogData) {
    return this.prisma.notification.create({
      data: {
        user_id: data.user_id,
        message: data.message,
      },
    });
  }

  async findLogsByUser(userId: string) {
    return this.prisma.notification.findMany({
      where: { user_id: userId },
      orderBy: { send_at: 'desc' },
    });
  }
}
