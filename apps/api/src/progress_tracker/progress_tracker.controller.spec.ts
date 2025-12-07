import { Test, TestingModule } from '@nestjs/testing';
import { ProgressTrackerController } from './progress_tracker.controller';
import { ProgressTrackerService } from './progress_tracker.service';
import { PrismaClient } from '@prisma/client';

describe('ProgressTrackerController', () => {
  let controller: ProgressTrackerController;

  const prismaMock = {} as unknown as PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgressTrackerController],
      providers: [
        ProgressTrackerService,
        { provide: PrismaClient, useValue: prismaMock },
      ],
    }).compile();

    controller = module.get(ProgressTrackerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
