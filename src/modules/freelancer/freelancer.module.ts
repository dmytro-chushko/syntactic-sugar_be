import { Module } from '@nestjs/common';
import { FreelancerController } from 'src/modules/freelancer/controllers/freelancer.controller';
import { FreelancerService } from 'src/modules/freelancer/services/freelancer.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { Skill } from 'src/database/entities/skill.entity';
import { Freelancer } from 'src/database/entities/freelancer.entity';
import { Category } from 'src/database/entities/category.entity';
import { Education } from 'src/database/entities/education.entity';
import { WorkHistory } from 'src/database/entities/workHistory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/modules/user/user.module';
import { Services } from 'src/utils/constants';
import { JwtService } from '@nestjs/jwt';
import { Country } from 'src/database/entities/country.entity';
import { CategoriesModule } from '../categories/categories.module';
import { SkillsModule } from '../skills/skills.module';
import { CountriesModule } from '../countries/countries.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CategoriesModule,
    SkillsModule,
    CountriesModule,
    TypeOrmModule.forFeature([Freelancer, Category, Skill, Education, WorkHistory, Country]),
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
