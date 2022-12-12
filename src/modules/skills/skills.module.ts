import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from 'src/database/entities/jobs.entity';
import { Skill } from 'src/database/entities/skill.entity';
import { Services } from 'src/utils/constants';
import { SkillsService } from './services/skills.service';

@Module({
  imports: [TypeOrmModule.forFeature([Skill, Job])],
  exports: [{ provide: Services.SKILLS, useClass: SkillsService }],
  providers: [{ provide: Services.SKILLS, useClass: SkillsService }],
})
export class SkillsModule {}
