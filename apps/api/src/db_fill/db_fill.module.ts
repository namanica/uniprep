import { Module } from '@nestjs/common';
import { DbFillService } from './db_fill.service';
import { DbFillController } from './db_fill.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [DbFillController],
  providers: [DbFillService, PrismaClient],
})
export class DbFillModule { }
