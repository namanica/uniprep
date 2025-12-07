import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import { PrismaService } from '../common/prisma/prisma.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let prisma: PrismaService;

  const mockPrismaService = {
    notification: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('createLog', () => {
    it('should successfully create a log entry', async () => {
      const dto = { user_id: 'uuid-123', message: 'Test Msg' };
      const expectedResult = { id: '1', ...dto, send_at: new Date() };

      (prisma.notification.create as jest.Mock).mockResolvedValue(
        expectedResult,
      );

      const result = await service.createLog(dto);

      expect(result).toEqual(expectedResult);

      expect(prisma.notification.create).toHaveBeenCalledWith({
        data: {
          user_id: dto.user_id,
          message: dto.message,
        },
      });
    });
  });

  describe('findLogsByUser', () => {
    it('should return an array of logs', async () => {
      const userId = 'uuid-123';
      const mockLogs = [{ id: '1', user_id: userId, message: 'Test' }];

      (prisma.notification.findMany as jest.Mock).mockResolvedValue(mockLogs);

      const result = await service.findLogsByUser(userId);

      expect(result).toEqual(mockLogs);
      expect(prisma.notification.findMany).toHaveBeenCalledWith({
        where: { user_id: userId },
        orderBy: { send_at: 'desc' },
      });
    });
  });
});
