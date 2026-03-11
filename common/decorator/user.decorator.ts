import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUser } from '../../src/auth/auth.type';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): CurrentUser => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user[data] : user;
  },
);
