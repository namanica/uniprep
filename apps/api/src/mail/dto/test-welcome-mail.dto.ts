import { IsEmail, IsNotEmpty } from 'class-validator';

export class TestWelcomeMailDto {
  @IsEmail()
  @IsNotEmpty()
  recipientEmail: string;
}
