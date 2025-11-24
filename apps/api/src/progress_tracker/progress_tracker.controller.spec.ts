import { Test, TestingModule } from '@nestjs/testing';
import { ProgressTrackerController } from './progress_tracker.controller';
import { PrismaClient } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ProgressTrackerController', () => {
  let controller: ProgressTrackerController;
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
      controllers: [ProgressTrackerController],
      providers: [
        {
          provide: PrismaClient,
          useValue: prismaMock,
        },
      ],
    }).compile();

    controller = module.get<ProgressTrackerController>(ProgressTrackerController);
    prisma = module.get<PrismaClient>(PrismaClient);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getMetrix should return list of metrics', async () => {
    const fakeData = [
      {
        id: 'rec_1',
        user_id: 'user_1',
        completed_topics: 5,
        accuracy_rate: 80.5,
        time_spent: 45,
      },
    ];

    (prisma.progress.findMany as jest.Mock).mockResolvedValue(fakeData);

    const result = await controller.getMetrix();

    expect(prisma.progress.findMany).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      message: 'Here are your metrics',
      data: fakeData,
    });
  });

  it('getMetrixById should return metric when found', async () => {
    const metric = {
      id: 'rec_1',
      user_id: 'user_1',
      completed_topics: 5,
      accuracy_rate: 80.5,
      time_spent: 45,
    };

    (prisma.progress.findUnique as jest.Mock).mockResolvedValue(metric);

    const result = await controller.getMetrixById({ id: 'rec_1' });

    expect(prisma.progress.findUnique).toHaveBeenCalledWith({
      where: { id: 'rec_1' },
    });

    expect(result).toEqual({
      message: 'Metric with id rec_1',
      data: metric,
    });
  });

  it('getMetrixById should throw 404 if metric not found', async () => {
    (prisma.progress.findUnique as jest.Mock).mockResolvedValue(null);

    try {
      await controller.getMetrixById({ id: 'rec_not_exists' });
      fail('Expected HttpException, but method resolved');
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect((e as HttpException).getStatus()).toBe(HttpStatus.NOT_FOUND);
    }
  });

  it('addMetrix should create metric', async () => {
    const body = {
      user_id: 'user_1',
      completed_topics: 5,
      accuracy_rate: 82.4,
      time_spent: 45,
    };

    const created = { id: 'rec_1', ...body };

    (prisma.progress.create as jest.Mock).mockResolvedValue(created);

    const result = await controller.addMetrix(body as any);

    expect(prisma.progress.create).toHaveBeenCalledWith({
      data: {
        user_id: body.user_id,
        completed_topics: body.completed_topics,
        accuracy_rate: body.accuracy_rate,
        time_spent: body.time_spent,
      },
    });

    expect(result).toEqual({
      message: 'Metric added successfully',
      data: created,
    });
  });

  it('updateMetrix should update metric', async () => {
    const body = {
      id: 'rec_1',
      user_id: 'user_1',
      completed_topics: 10,
      accuracy_rate: 90,
      time_spent: 60,
    };

    const updated = { ...body };

    (prisma.progress.update as jest.Mock).mockResolvedValue(updated);

    const result = await controller.updateMetrix(body as any);

    expect(prisma.progress.update).toHaveBeenCalledWith({
      where: { id: 'rec_1' },
      data: {
        user_id: body.user_id,
        completed_topics: body.completed_topics,
        accuracy_rate: body.accuracy_rate,
        time_spent: body.time_spent,
      },
    });

    expect(result).toEqual({
      message: 'Metric with id rec_1 updated',
      data: updated,
    });
  });

  it('deleteMetrix should delete metric', async () => {
    const deleted = {
      id: 'rec_1',
      user_id: 'user_1',
      completed_topics: 5,
      accuracy_rate: 80.5,
      time_spent: 45,
    };

    (prisma.progress.delete as jest.Mock).mockResolvedValue(deleted);

    const result = await controller.deleteMetrix({ id: 'rec_1' });

    expect(prisma.progress.delete).toHaveBeenCalledWith({
      where: { id: 'rec_1' },
    });

    expect(result).toEqual({
      message: 'Metric with id rec_1 deleted',
      data: deleted,
    });
  });
});
