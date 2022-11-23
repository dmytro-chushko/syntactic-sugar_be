import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { IAuthService } from 'src/modules/auth/interfaces/IAuthService';
import { IToken } from 'src/modules/auth/interfaces/IToken';
import { CreateUserDto } from 'src/modules/user/dtos/createUser.dto';
import { Services, UserRoles } from 'src/utils/constants';
import { IUserService } from 'src/modules/user/interfaces/IUserService';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/users.entity';
import { Repository } from 'typeorm';
import { MailService } from 'src/modules/mail/services/mail.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordDto } from 'src/modules/auth/dtos/resetPassword.dto';
import { hashPassword } from 'src/utils/hash';
import { comparePassword } from 'src/utils/hash';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USER) private readonly userService: IUserService,
    @Inject(Services.MAIL) private readonly mailService: MailService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async registration(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.userService.findByEmail(createUserDto.email);
      if (existingUser) {
        throw new HttpException(
          `user with such email ${createUserDto.email} exists`,
          HttpStatus.CONFLICT,
        );
      }
      const user = await this.userService.createUser(createUserDto);
      await this.sendConfirmation(user);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async sendConfirmation(user: User) {
    try {
      const confirmLink = `${process.env.CONFIRM_PATH}?id=${user.id}`;
      await this.mailService.sendActivationMail(user.email, confirmLink);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async confirmEmail(id: string): Promise<IToken> {
    try {
      const user = await this.userService.findById(id);
      if (!user) {
        throw new HttpException('not found', HttpStatus.BAD_REQUEST);
      }
      user.isActivated = true;
      await this.userRepository.save(user);
      const token = this.generateToken(user);

      return token;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(userDto: CreateUserDto): Promise<IToken> {
    try {
      const user = await this.userService.findByEmail(userDto.email);
      if (user) {
        const passwordEquals = await comparePassword(userDto.password, user.password);
        if (passwordEquals) {
          const token = this.generateToken(user);

          return token;
        }
      }
      throw new UnauthorizedException(`Authorization error`);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async loginByGoogle(token: string): Promise<IToken> {
    try {
      const client = new OAuth2Client(
        this.configService.get('GOOGLE_CLIENT_ID'),
        this.configService.get('GOOGLE_SECRET'),
      );
      const ticket = await client.getTokenInfo(token);
      const user = await this.userService.findByEmail(ticket.email);
      if (user) {
        const token = this.generateToken(user);

        return token;
      }
      throw new UnauthorizedException(`User with email: ${ticket.email} doesn't exist`);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async generateToken(user: User): Promise<IToken> {
    try {
      const payload = { email: user.email, id: user.id, role: user.role };

      return {
        token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async forgotPassword(email: string): Promise<boolean> {
    try {
      const existingUser = await this.userService.findByEmail(email);
      if (!existingUser) {
        throw new BadRequestException(`user with email ${email} does not exists`);
      }
      const token = await this.generateToken(existingUser);
      const resetPageLink = this.configService.get<string>('RESET_PASSWOPRD_LINK');
      await this.mailService.sendActivationMail(
        existingUser.email,
        `${resetPageLink}resetpassword/${token.token}`,
      );

      return true;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<boolean> {
    try {
      const user = this.jwtService.verify<User>(resetPasswordDto.token);
      if (!user) {
        throw new BadRequestException(`Your link has expired`);
      }
      const password = await hashPassword(resetPasswordDto.password);
      await this.userRepository.update(user.id, { password });

      return true;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async signupGoogle(token: string): Promise<IToken> {
    try {
      const client = new OAuth2Client(
        this.configService.get('GOOGLE_CLIENT_ID'),
        this.configService.get('GOOGLE_SECRET_KEY'),
      );
      const ticket = await client.getTokenInfo(token);
      const email = await this.userService.findByEmail(ticket.email);
      if (email) {
        throw new HttpException(
          `user with  ${ticket.email} is already registered`,
          HttpStatus.CONFLICT,
        );
      }
      const user = await this.userService.createGoogleUser(ticket.email);
      const tokenJwt = this.generateToken(user);

      return tokenJwt;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addUserRole(id: string, role: UserRoles): Promise<IToken> {
    try {
      const user = await this.userService.findById(id);
      if (user) {
        user.role = role;
        await this.userRepository.save(user);
        const token = await this.generateToken(user);

        return token;
      }
      throw new UnauthorizedException(`User doesn't exist`);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
