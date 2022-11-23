import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayloadDto } from '../dtos/jwtPayload.dto';
import { Services } from '../../../utils/constants';
import { IUserService } from '../../user/interfaces/IUserService';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(Services.USER) private readonly userService: IUserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_JWT,
    });
  }

  async validate(payload: JwtPayloadDto) {
    const user = await this.userService.getUserByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
