import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { IAuthService } from 'src/modules/auth/interfaces/IAuthService';
import { AuthUserDto } from 'src/modules/auth/dtos/authUser.dto';
import { Services, SUBJECT, UserRoles } from 'src/utils/constants';
import { IUserService } from 'src/modules/user/interfaces/IUserService';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/users.entity';
import { Repository } from 'typeorm';
import { MailService } from 'src/modules/mail/services/mail.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordDto } from 'src/modules/auth/dtos/resetPassword.dto';
import { comparePassword, hashPassword } from 'src/utils/hash';
import { postMailServiceHtml } from 'src/utils/postMailServiceHtml';
import { ITokenService } from 'src/modules/auth/interfaces/ITokenService';
import { ITokenAndRole } from 'src/modules/auth/interfaces/ITokenAndRole';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USER) private readonly userService: IUserService,
    @Inject(Services.MAIL) private readonly mailService: MailService,
    @Inject(Services.TOKEN) private readonly tokenService: ITokenService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async registration(authUserDto: AuthUserDto): Promise<ITokenAndRole> {
    try {
      const existingUser = await this.userService.findByEmail(authUserDto.email);
      if (existingUser) {
        throw new HttpException(
          `user with such email ${authUserDto.email} exists`,
          HttpStatus.CONFLICT,
        );
      }
      const user = await this.userService.createUser(authUserDto);
      await this.sendConfirmation(user);
      const token = await this.tokenService.generateToken(user);

      return { token: token.token, role: user.role };
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(authUserDto: AuthUserDto): Promise<ITokenAndRole> {
    try {
      const user = await this.userService.findByEmail(authUserDto.email);
      if (user) {
        const passwordEquals = await comparePassword(authUserDto.password, user.password);
        const currentUser = await this.userService.getCurrentUser(user.id);
        const isProfile = currentUser.employer || currentUser.freelancer ? true : false;

        if (passwordEquals) {
          const token = await this.tokenService.generateToken(user);

          return { token: token.token, role: user.role, isProfile };
        }
      }
      throw new UnauthorizedException(`Authorization error`);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async sendConfirmation(user: User): Promise<void> {
    try {
      const confirmLink = `${this.configService.get<string>('CONFIRM_PATH')}?id=${user.id}`;

      await this.mailService.sendActivationMail(
        user.email,
        postMailServiceHtml('confirmEmail', confirmLink),
        SUBJECT.CONFIRM_EMAIL,
      );
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async confirmEmail(id: string): Promise<void> {
    try {
      const user = await this.userService.findById(id);
      if (!user) {
        throw new HttpException('User doesnt exist', HttpStatus.BAD_REQUEST);
      }
      user.isActivated = true;

      await this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async loginByGoogle(token: string): Promise<ITokenAndRole> {
    try {
      const client = new OAuth2Client(
        this.configService.get('GOOGLE_CLIENT_ID'),
        this.configService.get('GOOGLE_SECRET'),
      );
      const ticket = await client.getTokenInfo(token);
      const user = await this.userService.findByEmail(ticket.email);
      if (user) {
        const token = await this.tokenService.generateToken(user);
        const currentUser = await this.userService.getCurrentUser(user.id);
        const isProfile = currentUser.employer || currentUser.freelancer ? true : false;

        return { token: token.token, role: user.role, isProfile };
      }
      this.signupGoogle(token);
      // throw new UnauthorizedException(`User with email: ${ticket.email} doesn't exist`);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      const existingUser = await this.userService.findByEmail(email);
      const token = await this.tokenService.generateToken(existingUser);
      const resetPassLink = `${this.configService.get<string>(
        'RESET_PASSWOPRD_LINK',
      )}resetpassword/${token.token}`;

      await this.mailService.sendActivationMail(
        existingUser.email,
        postMailServiceHtml('resetPassword', resetPassLink),
        SUBJECT.RESET_PASSWORD,
      );
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<boolean> {
    try {
      const user = this.jwtService.verify<User>(resetPasswordDto.token, {
        secret: this.configService.get('SECRET_JWT'),
      });
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

  async signupGoogle(token: string): Promise<ITokenAndRole> {
    try {
      const client = new OAuth2Client(
        this.configService.get('GOOGLE_CLIENT_ID'),
        this.configService.get('GOOGLE_SECRET'),
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
      const userToken = await this.tokenService.generateToken(user);

      return { token: userToken.token, role: user.role };
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addUserRole(id: string, role: UserRoles): Promise<ITokenAndRole> {
    try {
      const user = await this.userService.findById(id);
      if (user) {
        user.role = role;
        await this.userRepository.save(user);
        const token = await this.tokenService.generateToken(user);

        return { token: token.token, role: user.role };
      }
      throw new UnauthorizedException(`User doesn't exist`);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
