import { User } from 'src/database/entities/users.entity';
import { Category } from './entities/category.entity';
import { Country } from './entities/country.entity';
import { Job } from './entities/jobs.entity';
import { Skill } from './entities/skill.entity';
import { Employer } from 'src/database/entities/employer.entity';

export const entities = [User, Job, Skill, Category, Country, Employer];

export default entities;
