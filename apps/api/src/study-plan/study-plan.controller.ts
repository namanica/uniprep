import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  ParseUUIDPipe,
  Req,
} from '@nestjs/common';
import { StudyPlanService } from './study-plan.service';
import { CreateStudyPlanDto } from './dto/create-study-plan.dto';
import { UpdateTopicStatusDto } from './dto/update-topic-status.dto';

@Controller('study-plans')
export class StudyPlanController {
  constructor(private readonly studyPlanService: StudyPlanService) {}

  //Used by the AI Service (or internal logic) to save a newly generated plan.
  @Post()
  async createStudyPlan(
    @Body() createStudyPlanDto: CreateStudyPlanDto,
    @Req() req,
  ) {
    const userId = req.user.sub;
    const plan = await this.studyPlanService.createPlan(
      userId,
      createStudyPlanDto,
    );
    return {
      message: 'Study plan successfully created.',
      data: plan,
    };
  }

  @Get('current')
  async getMyLatestPlan(@Req() req) {
    const userId = req.user.sub;
    return this.studyPlanService.getLatestPlanByUser(userId);
  }

  @Patch('topics/:topicId')
  async updateTopicStatus(
    @Param('topicId', ParseUUIDPipe) topicId: string,
    @Body() updateStatusDto: UpdateTopicStatusDto,
    @Req() req,
  ) {
    const userId = req.user.sub;
    const updatedTopic = await this.studyPlanService.updateTopicStatus(
      userId,
      topicId,
      updateStatusDto.status,
    );

    return {
      message: 'Topic status updated successfully.',
      data: updatedTopic,
    };
  }
}
