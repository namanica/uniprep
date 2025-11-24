import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendMailDto } from './dto/send-mail.dto';
import { TestWelcomeMailDto } from './dto/test-welcome-mail.dto';
import { MailOptions } from './interfaces/mail-options.interface';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-test')
  async sendTestEmail(@Body() body: SendMailDto) {
    const mailOptions: MailOptions = {
      to: body.email,
      subject: body.subject || 'Default Test Subject',
      text: body.text || 'Default test text content.',
      html: body.html,
    };

    const result = await this.mailService.sendMail(mailOptions, undefined, {
      userId: body.userId,
    });

    return {
      message: 'Test email successfully queued.',
      details: result,
    };
  }

  @Post('test-welcome')
  async testWelcomeEmail(@Body() body: TestWelcomeMailDto) {
    await this.mailService.sendMail(
      {
        to: body.recipientEmail,
        subject: 'Welcome to UniPrep! (Auth Bypass Test)',
        text: 'Template-based email - please view with HTML support.',
      },
      'welcome',
      {
        userEmail: body.recipientEmail,
        userId: body.userId,
      },
    );

    return {
      message: `Welcome email test successfully initiated to ${body.recipientEmail}.`,
    };
  }
}
