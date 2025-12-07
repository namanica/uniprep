import { Test, TestingModule } from '@nestjs/testing';
import { DbFillService } from './db_fill.service';
import { PrismaClient } from '@prisma/client';

describe('DbFillService', () => {
  let service: DbFillService;
  let prisma: PrismaClient;

  const prismaMock = {
    answer: { findMany: jest.fn(), deleteMany: jest.fn() },
    topic: { findMany: jest.fn(), deleteMany: jest.fn() },
    flashcard: { findMany: jest.fn(), deleteMany: jest.fn() },
  } as unknown as PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DbFillService,
        { provide: PrismaClient, useValue: prismaMock },
      ],
    }).compile();

    service = module.get(DbFillService);
    prisma = module.get(PrismaClient);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
