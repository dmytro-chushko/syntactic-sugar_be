import { User } from 'src/database/entities/users.entity';
import { Freelancer } from './entities/freelancer.entity';
import { Category } from './entities/category.entity';
import { Skill } from './entities/skill.entity';

export const entities = [User, Freelancer, Category, Skill];
export default entities;
