import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import { join } from 'path';
import { MailOptions } from './interfaces/mail-options.interface';

@Injectable()
export class MailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('GMAIL_USER'),
        pass: this.configService.get<string>('GMAIL_PASS'),
      },
    });

    const viewsPath = join(process.cwd(), 'src', 'mail', 'templates');
    console.log('Template View Path:', viewsPath);
    this.transporter.use(
      'compile',
      hbs({
        viewEngine: {
          extName: '.hbs',
          partialsDir: viewsPath,
          defaultLayout: false,
        },
        viewPath: viewsPath,
        extName: '.hbs',
      }),
    );
  }

  async sendMail(
    options: MailOptions,
    template: string | undefined,
    context: Record<string, any>,
  ) {
    const mailOptions = {
      from: `"UniPrep" <${this.configService.get<string>('GMAIL_USER')}>`,
      to: options.to,
      subject: options.subject,
      template: template,
      context: context,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
      return info;
    } catch (error) {
      console.error('Mail Service Error:', error);
      throw new InternalServerErrorException('Failed to send email.');
    }
  }
}
