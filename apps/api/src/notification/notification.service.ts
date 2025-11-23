import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

interface NotificationLogData {
  user_id: string;
  message: string;
}

@Injectable()
export class NotificationService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    console.log('Prisma Client connected for NotificationService.');
  }

  async createLog(data: NotificationLogData) {
    return this.notification.create({
      data: {
        user_id: data.user_id,
        message: data.message,
      },
    });
  }

  async findLogsByUser(userId: string) {
    return this.notification.findMany({
      where: { user_id: userId },
      orderBy: { send_at: 'desc' },
    });
  }
}
