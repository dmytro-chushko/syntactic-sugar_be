import { createParamDecorator, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { IPayload } from 'src/modules/auth/interfaces/IToken';

export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Partial<IPayload> => {
    try {
      const request = ctx.switchToHttp().getRequest();

      return request.user;
    } catch (error) {
      throw new ForbiddenException();
    }
  },
);
