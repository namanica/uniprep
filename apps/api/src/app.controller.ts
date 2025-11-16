import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail/mail.service';

@Controller()
export class AppController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-test')
  async sendTestEmail(@Body('email') email: string) {
    return this.mailService.sendMail(
      email,
      'Test Email',
      'This is a test message.',
      '<b>This is a test message.</b>',
    );
  }
}
