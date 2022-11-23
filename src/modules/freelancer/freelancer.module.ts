import { Module } from '@nestjs/common';
import { FreelancerController } from 'src/modules/freelancer/controllers/freelancer.controller';
import { FreelancerService } from 'src/modules/freelancer/services/freelancer.service';
import { Services } from 'src/utils/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Freelancer } from 'src/database/entities/freelancer.entity';
import { UserModule } from 'src/modules/user/user.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { Category } from 'src/database/entities/category.entity';
import { Skill } from 'src/database/entities/skill.entity';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forFeature([Freelancer, Category, Skill]),
  ],
  controllers: [FreelancerController],
  providers: [
    {
      provide: Services.FREELANCER,
      useClass: FreelancerService,
    },
    JwtService,
  ],
})
export class FreelancerModule {}
