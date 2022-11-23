import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/services/user.service';
import { Services, UserRoles } from 'src/utils/constants';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class AuthRolesGuard implements CanActivate {
  constructor(
    @Inject(Services.USER) private userService: UserService,
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('User is not authorized');
      }
      const verifiedUser = await this.jwtService.verify(token);
      const user = await this.userService.findById(verifiedUser.id);
      if (user.isActivated) {
        throw new UnauthorizedException('User is not activated');
      }
      const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (requiredRoles.length === 0) {
        return true;
      }

      return requiredRoles.includes(user.role);
    } catch (error) {
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }
  }
}
