import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { JwtPayloadDto } from '../../modules/auth/dtos/jwtPayload.dto';

export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Partial<JwtPayloadDto> => {
    try {
      const request = ctx.switchToHttp().getRequest();

      return request.user;
    } catch (error) {
      throw new ForbiddenException();
    }
  },
);
