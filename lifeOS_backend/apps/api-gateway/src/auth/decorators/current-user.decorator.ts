import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ICurrentUser } from '@app/contracts/Auth/interfaces/auth.interface';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): ICurrentUser => {
    const request = ctx.switchToHttp().getRequest();
    console.log('🔍 Current User Decorator', request.user);
    return request.user;
  }
);

export const GetUserId = createParamDecorator((data: unknown, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest();
  return request.user?.id;
});

export const GetUserName = createParamDecorator((data: unknown, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest();
  return request.user?.username ?? request.user?.firstName;
});
