import { Test, TestingModule } from '@nestjs/testing';
import { StudyPlanService } from './study-plan.service';
import { PrismaService } from '../common/prisma/prisma.service';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { TopicStatus } from './dto/update-topic-status.dto';

describe('StudyPlanService', () => {
  let service: StudyPlanService;
  let prisma: PrismaService;

  const mockPrismaService = {
    studyPlan: {
      create: jest.fn(),
      findFirst: jest.fn(),
    },
    planTopic: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    topic: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudyPlanService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<StudyPlanService>(StudyPlanService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPlan', () => {
    const userId = 'user-uuid';
    const dto = {
      subjectId: 'subject-uuid',
      topics: [{ topicId: 'topic-1' }, { topicId: 'topic-2' }],
    };

    it('should create a plan with nested topics when topics are valid', async () => {
      // Mock the Topic validation check
      const validTopics = [
        { id: 'topic-1', name: 'Algebra' },
        { id: 'topic-2', name: 'Geometry' },
      ];
      (prisma.topic.findMany as jest.Mock).mockResolvedValue(validTopics);

      // Mock the Creation
      const expectedResult = { id: 'plan-1', user_id: userId, ...dto };
      (prisma.studyPlan.create as jest.Mock).mockResolvedValue(expectedResult);

      const result = await service.createPlan(userId, dto);

      expect(result).toEqual(expectedResult);

      // Verify validation was called
      expect(prisma.topic.findMany).toHaveBeenCalledWith({
        where: {
          id: { in: ['topic-1', 'topic-2'] },
          subject_id: dto.subjectId,
        },
      });

      // Verify creation was called with names snapshot from the DB
      expect(prisma.studyPlan.create).toHaveBeenCalledWith({
        data: {
          user_id: userId,
          subject_id: dto.subjectId,
          PlanTopics: {
            create: [
              { topic_id: 'topic-1', name: 'Algebra', status: 'PENDING' },
              { topic_id: 'topic-2', name: 'Geometry', status: 'PENDING' },
            ],
          },
        },
        include: { PlanTopics: true },
      });
    });

    it('should throw BadRequestException if topics are invalid or count mismatches', async () => {
      (prisma.topic.findMany as jest.Mock).mockResolvedValue([
        { id: 'topic-1', name: 'Algebra' },
      ]);

      await expect(service.createPlan(userId, dto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('updateTopicStatus', () => {
    const userId = 'user-uuid';
    const topicId = 'topic-1';
    const newStatus = TopicStatus.COMPLETED;

    it('should update status if topic exists and user is owner', async () => {
      // Mock findUnique to return topic AND the parent StudyPlan for ownership check
      (prisma.planTopic.findUnique as jest.Mock).mockResolvedValue({
        id: topicId,
        StudyPlan: { user_id: userId },
      });

      (prisma.planTopic.update as jest.Mock).mockResolvedValue({
        id: topicId,
        status: newStatus,
      });

      const result = await service.updateTopicStatus(
        userId,
        topicId,
        newStatus,
      );

      expect(result.status).toEqual(TopicStatus.COMPLETED);
      expect(prisma.planTopic.update).toHaveBeenCalledWith({
        where: { id: topicId },
        data: { status: newStatus },
      });
    });

    it('should throw ForbiddenException if user is NOT the owner', async () => {
      (prisma.planTopic.findUnique as jest.Mock).mockResolvedValue({
        id: topicId,
        StudyPlan: { user_id: 'other-user-id' },
      });

      await expect(
        service.updateTopicStatus(userId, topicId, newStatus),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw NotFoundException if topic does not exist', async () => {
      (prisma.planTopic.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        service.updateTopicStatus(userId, 'bad-id', newStatus),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
