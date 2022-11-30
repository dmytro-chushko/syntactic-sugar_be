import { User } from 'src/database/entities/users.entity';
import { Category } from './entities/category.entity';
import { Education } from './entities/education.entity';
import { Freelancer } from './entities/freelancer.entity';
import { Skill } from './entities/skill.entity';
import { WorkHistory } from './entities/workHistory.entity';
import { Employer } from './entities/employer.entity';
import { Job } from './entities/job.entity';

export const entities = [User, Skill, Category, Freelancer, Education, WorkHistory, Employer, Job];

export default entities;
