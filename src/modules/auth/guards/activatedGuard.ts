import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Services } from '../../../utils/constants';
import { IUserService } from '../../user/interfaces/IUserService';

@Injectable()
export class ActivatedGuard implements CanActivate {
  constructor(
    @Inject(Services.USER) private readonly userService: IUserService,
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const activated = this.reflector.getAllAndOverride<boolean>('activated', [
      context.getHandler(),
      context.getClass(),
    ]);
    const req = context.switchToHttp().getRequest();
    const user = await this.userService.getUserByEmail(req.user.email);

    return activated === user.isActivated;
  }
}
