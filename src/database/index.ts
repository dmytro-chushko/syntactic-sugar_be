import { User } from 'src/database/entities/users.entity';
import { Category } from './entities/category.entity';
import { Freelancer } from './entities/freelancer.entity';
import { Country } from './entities/country.entity';
import { Job } from './entities/jobs.entity';
import { Skill } from './entities/skill.entity';
import { Employer } from './entities/employer.entity';
import { Education } from './entities/education.entity';
import { WorkHistory } from './entities/workHistory.entity';
import { Proposal } from './entities/proposalFreelancer.entity';
import { Invitation } from './entities/invitation.entity';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';
import { Offer } from './entities/offers.entity';
import { Notification } from './entities';

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
  Proposal,
  Invitation,
  Chat,
  Message,
  Offer,
  Notification,
];

export default entities;
