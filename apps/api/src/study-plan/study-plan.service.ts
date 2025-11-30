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

  // Creates a new Study Plan and all associated Plan Topics in a single transaction.
  async createPlan(userId: string, dto: CreateStudyPlanDto) {
    const topicIds = dto.topics.map((t) => t.topicId);
    const validTopics = await this.prisma.topic.findMany({
      where: {
        id: { in: topicIds },
        subject_id: dto.subjectId, // Security check: Ensure topics belong to this subject
      },
    });

    if (validTopics.length !== topicIds.length) {
      throw new BadRequestException(
        'One or more topic IDs are invalid or do not belong to this subject.',
      );
    }

    return this.prisma.studyPlan.create({
      data: {
        user_id: userId,
        subject_id: dto.subjectId,
        PlanTopics: {
          create: validTopics.map((topic) => ({
            topic_id: topic.id,
            name: topic.name, // Snapshot the name
            status: 'PENDING',
          })),
        },
      },
      include: {
        PlanTopics: true,
      },
    });
  }

  // Updates the status of a specific topic
  async updateTopicStatus(
    userId: string,
    topicId: string,
    status: TopicStatus,
  ) {
    const topic = await this.prisma.planTopic.findUnique({
      where: { id: topicId },
      include: { StudyPlan: true }, // Include parent plan to check owner
    });

    if (!topic) {
      throw new NotFoundException(`Topic with ID ${topicId} not found`);
    }

    // Security Check: Ensure the user owns the plan this topic belongs to
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

  // Retrieves the latest Study Plan for a user, including the topics and their status
  async getLatestPlanByUser(userId: string) {
    const plan = await this.prisma.studyPlan.findFirst({
      where: { user_id: userId },
      orderBy: { xata_createdat: 'desc' }, // Get the most recent one
      include: {
        PlanTopics: {
          orderBy: { name: 'asc' },
        },
        Subject: true, // Include subject details
      },
    });

    if (!plan) {
      throw new NotFoundException(`No study plan found for user ${userId}`);
    }

    return plan;
  }
}
