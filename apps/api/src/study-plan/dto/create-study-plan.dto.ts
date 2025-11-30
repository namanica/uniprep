import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

// Helper DTO for the individual topics inside the array
export class CreatePlanTopicDto {
  @IsString()
  @IsNotEmpty()
  topicId: string;

  // @IsNumber()
  // @IsOptional()
  // priority?: number;
}

// The Main DTO
export class CreateStudyPlanDto {
  @IsUUID()
  @IsNotEmpty()
  subjectId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePlanTopicDto)
  topics: CreatePlanTopicDto[];
}
