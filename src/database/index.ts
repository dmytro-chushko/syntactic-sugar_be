import { User } from 'src/database/entities/users.entity';
import { Category } from './entities/category.entity';
import { Freelancer } from './entities/freelancer.entity';
import { Country } from './entities/country.entity';
import { Job } from './entities/jobs.entity';
import { Skill } from './entities/skill.entity';
import { Employer } from 'src/database/entities/employer.entity';
import { Education } from './entities/education.entity';
import { WorkHistory } from './entities/workHistory.entity';

export const entities = [
  User,
  Job,
  Skill,
  Category,
  Freelancer,
  Country,
  Employer,
  Education,
  WorkHistory,
];

export default entities;
