import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

type AuthServiceMock = {
  [K in keyof AuthService]?: jest.Mock;
};

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthServiceMock;

  beforeEach(async () => {
    service = {
      signUp: jest.fn(),
      signIn: jest.fn(),
      logout: jest.fn(),
      refreshTokens: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: service }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('signUp calls AuthService.signUp', async () => {
    const dto = { email: 'test123@gmail.com', password: '123' };
    service.signUp?.mockResolvedValue('tokens');

    expect(await controller.signUp(dto)).toBe('tokens');
    expect(service.signUp).toHaveBeenCalledWith(dto);
  });

  it('signIn calls AuthService.signIn', async () => {
    const dto = { email: 'test123@gmail.com', password: '123' };
    service.signIn?.mockResolvedValue('tokens');

    expect(await controller.signIn(dto)).toBe('tokens');
    expect(service.signIn).toHaveBeenCalledWith(dto);
  });

  it('logout calls AuthService.logout', async () => {
    const req = { user: { sub: 'user-id' } };
    service.logout?.mockResolvedValue('ok');

    expect(await controller.logout(req)).toBe('ok');
    expect(service.logout).toHaveBeenCalledWith('user-id');
  });

  it('refresh calls AuthService.refreshTokens', async () => {
    const req = { user: { sub: 'user-id', refreshToken: 'refresh-token' } };
    service.refreshTokens?.mockResolvedValue('tokens');

    expect(await controller.refresh(req)).toBe('tokens');
    expect(service.refreshTokens).toHaveBeenCalledWith(
      'user-id',
      'refresh-token',
    );
  });
});
