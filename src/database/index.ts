import { User } from 'src/database/entities/users.entity';
import { Category } from './entities/category.entity';
import { Freelancer } from './entities/freelancer.entity';
import { Skill } from './entities/skill.entity';

export const entities = [User, Skill, Category, Freelancer];
export default entities;
