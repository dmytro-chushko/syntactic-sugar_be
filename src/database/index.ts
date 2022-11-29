import { User } from 'src/database/entities/users.entity';
import { Category } from './entities/category.entity';
import { Country } from './entities/country.entity';
import { Job } from './entities/jobs.entity';
import { Skill } from './entities/skill.entity';

export const entities = [User, Job, Skill, Category, Country];
export default entities;
