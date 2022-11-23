import { JwtPayloadDto } from '../dtos/jwtPayload.dto';

export interface ITokenService {
  generateJwtToken(jwtPayload: JwtPayloadDto);
}
