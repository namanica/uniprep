import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';
import { NotificationService } from '../notification/notification.service';
import * as nodemailer from 'nodemailer';

jest.mock('nodemailer');
jest.mock('nodemailer-express-handlebars', () => () => jest.fn());

describe('MailService', () => {
  let service: MailService;
  let sendMailMock: jest.Mock;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'GMAIL_USER') return 'test@gmail.com';
      if (key === 'GMAIL_PASS') return 'secret';
      return null;
    }),
  };

  const mockNotificationService = {
    createLog: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    sendMailMock = jest.fn();

    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: sendMailMock,
      use: jest.fn(),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        { provide: ConfigService, useValue: mockConfigService },
        { provide: NotificationService, useValue: mockNotificationService },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendMail', () => {
    const mockContext = { userId: 'user-123' };
    const mockOptions = { to: 'rec@test.com', subject: 'Test' };

    it('should send a manual email (no template) and log success', async () => {
      sendMailMock.mockResolvedValue({ messageId: '123' });

      await service.sendMail(mockOptions, undefined, mockContext);

      expect(sendMailMock).toHaveBeenCalledWith(
        expect.objectContaining({
          to: mockOptions.to,
          subject: mockOptions.subject,
        }),
      );

      expect(mockNotificationService.createLog).toHaveBeenCalledWith({
        user_id: mockContext.userId,
        message: expect.stringContaining('successfully sent'),
      });
    });

    it('should handle errors and log failure', async () => {
      sendMailMock.mockRejectedValue(new Error('SMTP Error'));

      await expect(
        service.sendMail(mockOptions, undefined, mockContext),
      ).rejects.toThrow();

      expect(mockNotificationService.createLog).toHaveBeenCalledWith({
        user_id: mockContext.userId,
        message: expect.stringContaining('Email FAILED'),
      });
    });
  });
});
