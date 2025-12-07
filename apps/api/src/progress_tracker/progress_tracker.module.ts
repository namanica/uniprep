import { Module } from '@nestjs/common';
import { ProgressTrackerService } from './progress_tracker.service';
import { PrismaClient } from '@prisma/client';
import { ProgressTrackerController } from './progress_tracker.controller';

@Module({
  providers: [ProgressTrackerService, PrismaClient],
  controllers: [ProgressTrackerController],
})
export class ProgressTrackerModule {}
