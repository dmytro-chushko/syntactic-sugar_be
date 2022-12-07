import { Skill } from 'src/database/entities/skill.entity';
import { CreateSkillDto } from 'src/modules/skills/dto/createSkillDto';

export interface ISkillsService {
  createSkill(createSkillDto: CreateSkillDto): Promise<Skill>;
  getSkillByName(name: string): Promise<Skill>;
}
