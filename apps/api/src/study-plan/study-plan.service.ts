import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateStudyPlanDto } from './dto/create-study-plan.dto';
import { TopicStatus } from './dto/update-topic-status.dto';

@Injectable()
export class StudyPlanService {
  constructor(private readonly prisma: PrismaService) {}

  // Creates OR Updates a Study Plan
  async createPlan(userId: string, dto: CreateStudyPlanDto) {
    const topicIds = dto.topics.map((t) => t.topicId);

    const validTopics = await this.prisma.topic.findMany({
      where: {
        id: { in: topicIds },
        subject_id: dto.subjectId,
      },
    });

    if (validTopics.length !== topicIds.length) {
      throw new BadRequestException(
        'One or more topic IDs are invalid or do not belong to this subject.',
      );
    }

    const existingPlan = await this.prisma.studyPlan.findFirst({
      where: {
        user_id: userId,
        subject_id: dto.subjectId,
      },
    });

    if (existingPlan) {
      return this.prisma.studyPlan.update({
        where: { id: existingPlan.id },
        data: {
          PlanTopics: {
            deleteMany: {},
            create: validTopics.map((topic) => ({
              topic_id: topic.id,
              name: topic.name,
              status: 'PENDING',
            })),
          },
        },
        include: { PlanTopics: true },
      });
    } else {
      // CREATE: Make a fresh plan
      return this.prisma.studyPlan.create({
        data: {
          user_id: userId,
          subject_id: dto.subjectId,
          PlanTopics: {
            create: validTopics.map((topic) => ({
              topic_id: topic.id,
              name: topic.name,
              status: 'PENDING',
            })),
          },
        },
        include: { PlanTopics: true },
      });
    }
  }

  // Updates the status of a specific topic
  async updateTopicStatus(
    userId: string,
    topicId: string,
    status: TopicStatus,
  ) {
    const topic = await this.prisma.planTopic.findUnique({
      where: { id: topicId },
      include: { StudyPlan: true },
    });

    if (!topic) {
      throw new NotFoundException(`Topic with ID ${topicId} not found`);
    }

    if (topic.StudyPlan.user_id !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this topic.',
      );
    }

    return this.prisma.planTopic.update({
      where: { id: topicId },
      data: { status },
    });
  }

  // Get ALL plans for the user
  async getAllPlansByUser(userId: string) {
    return this.prisma.studyPlan.findMany({
      where: { user_id: userId },
      orderBy: { xata_createdat: 'desc' },
      include: {
        Subject: true,
      },
    });
  }

  // Get a SINGLE plan by Subject ID
  async getPlanBySubject(userId: string, subjectId: string) {
    const plan = await this.prisma.studyPlan.findFirst({
      where: {
        user_id: userId,
        subject_id: subjectId,
      },
      include: {
        PlanTopics: {
          orderBy: { name: 'asc' }, // Order topics alphabetically (or by another field)
        },
        Subject: true,
      },
    });

    if (!plan) {
      throw new NotFoundException(
        `No study plan found for subject ${subjectId}`,
      );
    }

    return plan;
  }
}
