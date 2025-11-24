import { IsNotEmpty, IsUUID, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsUUID()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
