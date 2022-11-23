import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { IAuthService } from 'src/modules/auth/interfaces/IAuthService';
import { AuthUserDto } from 'src/modules/auth/dtos/authUser.dto';
import { CreateGoogleUserDto } from 'src/modules/user/dtos/createGoogleUser.dto';
import { Services } from 'src/utils/constants';
import { IUserService } from 'src/modules/user/interfaces/IUserService';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/users.entity';
import { Repository } from 'typeorm';
import { MailService } from 'src/modules/mail/services/mail.service';
import { ConfigService } from '@nestjs/config';
import { TokenService } from './tokenService';
import { comparePasswords } from '../../../utils/hash';
import { JwtService } from '@nestjs/jwt';
import { ConfirmAccountDto } from '../dtos/confirmAccount.dto';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USER) private readonly userService: IUserService,
    @Inject(Services.MAIL) private readonly mailService: MailService,
    @Inject(Services.TOKEN) private readonly tokenService: TokenService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async registration(registerUserDto: AuthUserDto) {
    try {
      const existingUser = await this.userService.getUserByEmail(
        registerUserDto.email,
      );
      if (existingUser) {
        throw new HttpException(
          `user with such email ${registerUserDto.email} exists`,
          HttpStatus.CONFLICT,
        );
      }
      const user = await this.userService.createUser(registerUserDto);
      await this.sendConfirmation(user);

      const jwtToken = await this.tokenService.generateJwtToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      return jwtToken;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(loginUserDto: AuthUserDto) {
    const user = await this.userService.getUserByEmail(loginUserDto.email);
    if (!user) {
      throw new BadRequestException();
    }
    if (user.isActivated === false) throw new BadRequestException();
    const validatePassword = await comparePasswords(
      loginUserDto.password,
      user.password,
    );
    if (!validatePassword) throw new BadRequestException();

    return this.tokenService.generateJwtToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  }

  async sendConfirmation(user: User) {
    try {
      const confirmLink = `${process.env.CONFIRM_PATH}?id=${user.id}`;
      await this.mailService.sendActivationMail(user.email, confirmLink);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async confirmEmail(userId: ConfirmAccountDto) {
    try {
      const user = await this.userService.getUserById(userId.id);
      if (!user) {
        throw new HttpException('not found', HttpStatus.BAD_REQUEST);
      }
      user.isActivated = true;
      await this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async signupGoogle(token: string): Promise<CreateGoogleUserDto> {
    try {
      const client = new OAuth2Client(
        this.configService.get('GOOGLE_CLIENT_ID'),
        this.configService.get('GOOGLE_SECRET_KEY'),
      );
      const ticket = await client.getTokenInfo(token);
      const user = await this.userService.getUserByEmail(ticket.email);
      if (user) {
        throw new HttpException(
          `user with  ${ticket.email} is already registered`,
          HttpStatus.CONFLICT,
        );
      }
      const newUser = await this.userService.createGoogleUser(ticket.email);

      return newUser;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
