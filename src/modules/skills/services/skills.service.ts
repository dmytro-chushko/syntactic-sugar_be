import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from 'src/database/entities/skill.entity';
import { ISkillsService } from 'src/modules/skills/interfaces/ISkillsService';
import { Repository } from 'typeorm';
import { CreateSkillDto } from 'src/modules/skills/dto/createSkillDto';

@Injectable()
export class SkillsService implements ISkillsService {
  constructor(@InjectRepository(Skill) private readonly skillRepository: Repository<Skill>) {}

  async createSkill(createSkillDto: CreateSkillDto): Promise<Skill> {
    const skill = this.skillRepository.create(createSkillDto);

    return await this.skillRepository.save(skill);
  }

  async getSkillByName(name: string): Promise<Skill> {
    return await this.skillRepository.findOneBy({ name });
  }
}
