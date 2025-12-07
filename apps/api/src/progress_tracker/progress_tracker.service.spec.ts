import { Test, TestingModule } from '@nestjs/testing';
import { ProgressTrackerService } from './progress_tracker.service';
import { PrismaClient } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ProgressTrackerService', () => {
  let service: ProgressTrackerService;
  let prisma: PrismaClient;

  const prismaMock = {
    progress: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  } as unknown as PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProgressTrackerService,
        {
          provide: PrismaClient,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<ProgressTrackerService>(ProgressTrackerService);
    prisma = module.get<PrismaClient>(PrismaClient);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getMetrix should return data from DB', async () => {
    const fakeData = [{ id: 'rec_1' }];
    (prisma.progress.findMany as jest.Mock).mockResolvedValue(fakeData);

    const result = await service.getMetrix();

    expect(prisma.progress.findMany).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      message: 'Here are your metrics',
      data: fakeData,
    });
  });

  it('getMetrixById should return data when found', async () => {
    const metric = { id: 'rec_1' };
    (prisma.progress.findUnique as jest.Mock).mockResolvedValue(metric);

    const result = await service.getMetrixById({ id: 'rec_1' });

    expect(prisma.progress.findUnique).toHaveBeenCalledWith({
      where: { id: 'rec_1' },
    });
    expect(result).toEqual({
      message: 'Metric with id rec_1',
      data: metric,
    });
  });

  it('getMetrixById returns null data when not found', async () => {
    (prisma.progress.findUnique as jest.Mock).mockResolvedValue(null);

    const result = await service.getMetrixById({ id: 'rec_x' });

    expect(result).toEqual({
      message: 'Metric with id rec_x',
      data: null,
    });
  });

  it('addMetrix should create new metric', async () => {
    const body = {
      user_id: 'u1',
      completed_topics: 10,
      accuracy_rate: 76.3,
      time_spent: 30,
      updated_at: new Date(),
    };

    const created = { id: 'rec_1', ...body };
    (prisma.progress.create as jest.Mock).mockResolvedValue(created);

    const result = await service.addMetrix(body);

    expect(prisma.progress.create).toHaveBeenCalledWith({
      data: body,
    });

    expect(result).toEqual({
      message: 'Metric added successfully',
      data: created,
    });
  });

  it('updateMetrix should update an existing metric', async () => {
    const body = {
      id: 'rec_1',
      completed_topics: 20,
      accuracy_rate: 90,
      time_spent: 50,
    };

    const updated = { ...body };
    (prisma.progress.update as jest.Mock).mockResolvedValue(updated);

    const result = await service.updateMetrix(body);

    expect(prisma.progress.update).toHaveBeenCalledWith({
      where: { id: 'rec_1' },
      data: {
        user_id: undefined,
        completed_topics: 20,
        accuracy_rate: 90,
        time_spent: 50,
      },
    });

    expect(result).toEqual({
      message: 'Metric with id rec_1 updated',
      data: updated,
    });
  });

  it('deleteMetrix should delete a metric', async () => {
    const deleted = { id: 'rec_1' };
    (prisma.progress.delete as jest.Mock).mockResolvedValue(deleted);

    const result = await service.deleteMetrix({ id: 'rec_1' });

    expect(prisma.progress.delete).toHaveBeenCalledWith({
      where: { id: 'rec_1' },
    });

    expect(result).toEqual({
      message: 'Metric with id rec_1 deleted',
      data: deleted,
    });
  });
});
