import { Test, TestingModule } from '@nestjs/testing';
import { StudyPlanController } from '../study-plan/study-plan.controller';
import { StudyPlanService } from '../study-plan/study-plan.service';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

const mockStudyPlanService = {
  createPlan: jest.fn(),
  getAllPlansByUser: jest.fn(),
  getPlanBySubject: jest.fn(),
  updateTopicStatus: jest.fn(),
};

describe('StudyPlanController', () => {
  let controller: StudyPlanController;
  const mockRequest = { user: { sub: 'test-user-id' } };
  const mockPlanDto = {
    subjectId: 'subject-id',
    topics: [{ topicId: 'topic-id' }],
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudyPlanController],
      providers: [
        {
          provide: StudyPlanService,
          useValue: mockStudyPlanService,
        },
      ],
    }).compile();

    controller = module.get<StudyPlanController>(StudyPlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createStudyPlan', () => {
    it('should call service.createPlan with userId from token', async () => {
      mockStudyPlanService.createPlan.mockResolvedValue({ id: 'plan-1' });

      const result = await controller.createStudyPlan(
        mockPlanDto as any,
        mockRequest as any,
      );

      expect(mockStudyPlanService.createPlan).toHaveBeenCalledWith(
        'test-user-id',
        mockPlanDto,
      );
      expect(result.data).toEqual({ id: 'plan-1' });
    });
  });

  describe('getMyLatestPlanBySubject', () => {
    it('should call service.getPlanBySubject with userId from token and subjectId from param', async () => {
      const subjectId = 'subject-abc';
      mockStudyPlanService.getPlanBySubject.mockResolvedValue({});

      await controller.getPlanBySubject(subjectId, mockRequest as any);

      expect(mockStudyPlanService.getPlanBySubject).toHaveBeenCalledWith(
        'test-user-id',
        subjectId,
      );
    });
  });

  describe('updateTopicStatus', () => {
    it('should call service.updateTopicStatus with correct IDs and status', async () => {
      const topicId = 'topic-1';
      const statusDto = { status: 'COMPLETED' };
      mockStudyPlanService.updateTopicStatus.mockResolvedValue({
        id: topicId,
        status: 'COMPLETED',
      });

      await controller.updateTopicStatus(
        topicId,
        statusDto as any,
        mockRequest as any,
      );

      expect(mockStudyPlanService.updateTopicStatus).toHaveBeenCalledWith(
        'test-user-id',
        topicId,
        'COMPLETED',
      );
    });
  });

  describe('updateTopicStatus (Exception)', () => {
    const topicId = 'topic-1';
    const statusDto = { status: 'COMPLETED' };

    it('should throw ForbiddenException when service denies access', async () => {
      mockStudyPlanService.updateTopicStatus.mockRejectedValue(
        new ForbiddenException(
          'You do not have permission to update this topic.',
        ),
      );

      await expect(
        controller.updateTopicStatus(
          topicId,
          statusDto as any,
          mockRequest as any,
        ),
      ).rejects.toThrow(ForbiddenException);

      await expect(
        controller.updateTopicStatus(
          topicId,
          statusDto as any,
          mockRequest as any,
        ),
      ).rejects.toThrow('You do not have permission to update this topic.');
    });
  });
});
