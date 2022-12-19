import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { FreelancerController } from 'src/modules/freelancer/controllers/freelancer.controller';
import { FreelancerService } from 'src/modules/freelancer/services/freelancer.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { Skill } from 'src/database/entities/skill.entity';
import { Freelancer } from 'src/database/entities/freelancer.entity';
import { Category } from 'src/database/entities/category.entity';
import { Education } from 'src/database/entities/education.entity';
import { WorkHistory } from 'src/database/entities/workHistory.entity';
import { UserModule } from 'src/modules/user/user.module';
import { Services } from 'src/utils/constants';
import { Country } from 'src/database/entities/country.entity';
import { CategoriesModule } from 'src/modules/categories/categories.module';
import { SkillsModule } from 'src/modules/skills/skills.module';
import { CountriesModule } from 'src/modules/countries/countries.module';
import { FilesModule } from 'src/modules/files/files.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CategoriesModule,
    SkillsModule,
    CountriesModule,
    FilesModule,
    TypeOrmModule.forFeature([Freelancer, Category, Skill, Education, WorkHistory, Country]),
  ],
  exports: [
    {
      provide: Services.FREELANCER,
      useClass: FreelancerService,
    },
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
