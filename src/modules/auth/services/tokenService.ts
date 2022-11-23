import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadDto } from '../dtos/jwtPayload.dto';
import { ITokenService } from '../interfaces/ITokenService';

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateJwtToken(jwtPayload: JwtPayloadDto) {
    return {
      accessToken: this.jwtService.sign(jwtPayload, {
        secret: this.configService.get('SECRET_JWT'),
        expiresIn: this.configService.get('EXPIRES_JWT'),
      }),
    };
  }
}
