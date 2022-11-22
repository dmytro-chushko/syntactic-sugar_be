import {
  //   HttpException,
  //   HttpStatus,
  Inject,
  Injectable,
  //   BadRequestException,
  //   UnauthorizedException,
} from '@nestjs/common';
// import { IAuthService } from 'src/modules/auth/interfaces/IAuthService';
// import { IToken } from 'src/modules/auth/interfaces/IToken';
// import { CreateEmployerDto } from 'src/modules/employer/dtos/createEmployer.dto';
import { Services } from 'src/utils/constants';
import { IUserService } from 'src/modules/user/interfaces/IUserService';
import { InjectRepository } from '@nestjs/typeorm';
import { Employer } from 'src/database/entities/employer.entity';
import { Repository } from 'typeorm';
import { MailService } from 'src/modules/mail/services/mail.service';
// import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IEmployerService } from 'src/modules/employer/interfaces/IEmployerService';

@Injectable()
export class EmployerService implements IEmployerService {
  constructor(
    @Inject(Services.USER) private readonly userService: IUserService,
    @Inject(Services.MAIL) private readonly mailService: MailService,
    @Inject(Services.EMPLOYER)
    private readonly employerService: IEmployerService,
    @InjectRepository(Employer)
    private readonly employerRepository: Repository<Employer>,
    // private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createEmployer() {
    // try {
    //   const existingUser = await this.userService.findByEmail(
    //     createUserDto.email,
    //   );
    //   if (existingUser) {
    //     throw new HttpException(
    //       `user with such email ${createUserDto.email} exists`,
    //       HttpStatus.CONFLICT,
    //     );
    //   }
    //   const user = await this.userService.createUser(createUserDto);
    // } catch (error) {
    //   throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    // }
  }
}
