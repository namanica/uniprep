import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RefreshJwtGuard } from './guards';
import type { SignInBody, SignUpBody } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('sign-up')
  signUp(@Body() body: SignUpBody) {
    return this.auth.signUp(body);
  }

  @Post('sign-in')
  signIn(@Body() body: SignInBody) {
    return this.auth.signIn(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Req() req) {
    const userId = req.user.sub;

    return this.auth.logout(userId);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh-tokens')
  refresh(@Req() req) {
    const userId = req.user.sub;
    const userRefreshToken = req.user.refreshToken;

    return this.auth.refreshTokens(userId, userRefreshToken);
  }
}
