import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '@common/prisma';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from './notification/notification.module';
import { ProgressTrackerController } from './progress_tracker/progress_tracker.controller';
import { ProgressTrackerModule } from './progress_tracker/progress_tracker.module';
import { DbFillModule } from './db_fill/db_fill.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    MailModule,
    ConfigModule.forRoot(),
    NotificationModule,
    ProgressTrackerModule,
    DbFillModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
