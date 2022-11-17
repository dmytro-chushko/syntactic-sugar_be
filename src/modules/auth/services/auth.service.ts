import { HttpException, HttpStatus, Inject, Injectable, BadRequestException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { IAuthService } from 'src/modules/auth/interfaces/IAuthService';
import { IToken } from 'src/modules/auth/interfaces/IToken';
import { CreateUserDto } from 'src/modules/user/dtos/createUser.dto';
import { CreateGoogleUserDto } from 'src/modules/user/dtos/createGoogleUser.dto';
import { Services } from 'src/utils/constants';
import { IUserService } from 'src/modules/user/interfaces/IUserService';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/users.entity';
import { Repository } from 'typeorm';
import { MailService } from 'src/modules/mail/services/mail.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

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

  async confirmEmail(id: string) {
    try {
      const user = await this.userService.findById(id);
      if (!user) {
        throw new HttpException('not found', HttpStatus.BAD_REQUEST);
      }
      user.isActivated = true;

      return this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async generateToken(user: User): Promise<IToken> {
    try {
      const payload = { email: user.email, id: user.id };

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
      await this.mailService.sendActivationMail(
        existingUser.email,
        `${process.env.RESET_PASSWOPRD_LINK}resetpassword/${token.token}`,
      );

      return true;
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
      const email = await this.userService.findByEmail(ticket.email);
      if (email) {
        throw new HttpException(
          `user with  ${ticket.email} is already registered`,
          HttpStatus.CONFLICT,
        );
      }
      const user = await this.userService.createGoogleUser(ticket.email);

      return user;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
