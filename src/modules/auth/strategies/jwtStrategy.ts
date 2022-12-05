import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Services } from 'src/utils/constants';
import { IUserService } from 'src/modules/user/interfaces/IUserService';
import { IPayload } from 'src/modules/auth/interfaces/IToken';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(Services.USER) private readonly userService: IUserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'test',
    });
  }
  // process.env.SECRET_JWT
  async validate(payload: IPayload) {
    try {
      const user = await this.userService.findByEmail(payload.email);
      if (!user) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
