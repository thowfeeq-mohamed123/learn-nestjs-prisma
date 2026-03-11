import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (info?.name === 'TokenExpiredError') {
      throw new UnauthorizedException(
        'Your login session has expired. Please login again.',
      );
    }

    if (info?.name === 'JsonWebTokenError') {
      throw new UnauthorizedException('Invalid authentication token.');
    }

    if (!user) {
      throw new UnauthorizedException('Authentication token is missing.');
    }

    return user;
  }
}
