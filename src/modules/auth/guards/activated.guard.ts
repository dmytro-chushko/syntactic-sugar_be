import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { IUserService } from 'src/modules/user/interfaces/IUserService';

@Injectable()
export class ActivatedGuard implements CanActivate {
  constructor(@Inject(Services.USER) private readonly userService: IUserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const user = await this.userService.findByEmail(
        req.body.email || req.headers.authorization.email,
      );

      return user.isActivated;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
