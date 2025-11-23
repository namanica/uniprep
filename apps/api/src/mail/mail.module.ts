import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [ConfigModule, NotificationModule],
  providers: [MailService],
  controllers: [MailController],
})
export class MailModule {}
