import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ITokenService } from 'src/modules/auth/interfaces/ITokenService';
import { IPayload, IToken } from '../interfaces/IToken';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/entities/users.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(user: User): Promise<IToken> {
    try {
      const payload: IPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      return {
        token: this.jwtService.sign(payload, {
          secret: this.configService.get('SECRET_JWT'),
          expiresIn: this.configService.get('EXPIRES_JWT'),
        }),
      };
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
