import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt.guard';

export const AuthGlobalGuard = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
};
