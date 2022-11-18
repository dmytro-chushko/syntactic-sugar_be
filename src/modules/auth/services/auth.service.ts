import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { IAuthService } from 'src/modules/auth/interfaces/IAuthService';
import { CreateUserDto } from 'src/modules/user/dtos/createUser.dto';
import { CreateGoogleUserDto } from 'src/modules/user/dtos/createGoogleUser.dto';
import { Services } from 'src/utils/constants';
import { IUserService } from 'src/modules/user/interfaces/IUserService';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/users.entity';
import { Repository } from 'typeorm';
import { MailService } from 'src/modules/mail/services/mail.service';
import { ConfigService } from '@nestjs/config';
// import { ResetPasswordDto } from 'src/modules/auth/dtos/resetPassword.dto';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USER) private readonly userService: IUserService,
    @Inject(Services.MAIL) private readonly mailService: MailService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
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

  // async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {}
}
