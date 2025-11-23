import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class TestWelcomeMailDto {
  @IsEmail()
  @IsNotEmpty()
  recipientEmail: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
