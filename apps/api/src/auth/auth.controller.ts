import { Body, Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards';
import type { SignInBody, SignUpBody } from './interfaces';
import { Public } from '@common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Public()
  @Post('sign-up')
  signUp(@Body() body: SignUpBody) {
    return this.auth.signUp(body);
  }

  @Public()
  @Post('sign-in')
  signIn(@Body() body: SignInBody) {
    return this.auth.signIn(body);
  }

  @Post('logout')
  logout(@Req() req) {
    const userId = req.user.sub;

    return this.auth.logout(userId);
  }

  @Get('me')
  getMe(@Req() req) {
    const userId = req.user.sub;

    return this.auth.getMe(userId);
  }

  @Public()
  @UseGuards(RefreshJwtGuard)
  @Post('refresh-tokens')
  refresh(@Req() req) {
    const userId = req.user.sub;
    const userRefreshToken = req.user.refreshToken;

    return this.auth.refreshTokens(userId, userRefreshToken);
  }
}
