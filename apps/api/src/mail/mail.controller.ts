import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendMailDto } from './dto/send-mail.dto';
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

    const result = await this.mailService.sendMail(mailOptions);

    return {
      message: 'Test email successfully queued.',
      details: result,
    };
  }
}
