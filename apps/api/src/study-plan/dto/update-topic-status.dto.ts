import { IsEnum, IsNotEmpty } from 'class-validator';

// Define the allowed status values matching your business logic
export enum TopicStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export class UpdateTopicStatusDto {
  @IsEnum(TopicStatus, {
    message: 'Status must be PENDING, IN_PROGRESS, or COMPLETED',
  })
  @IsNotEmpty()
  status: TopicStatus;
}
