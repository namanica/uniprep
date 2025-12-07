import { Test, TestingModule } from '@nestjs/testing';
import { DbFillController } from './db_fill.controller';
import { DbFillService } from './db_fill.service';
import { PrismaClient } from '@prisma/client';

describe('DbFillController', () => {
  let controller: DbFillController;

  const prismaMock = {} as unknown as PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DbFillController],
      providers: [
        DbFillService,
        { provide: PrismaClient, useValue: prismaMock },
      ],
    }).compile();

    controller = module.get(DbFillController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
