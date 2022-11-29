import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  EmploymentType,
  HourRate,
  AvailableAmountOfHours,
  WorkExperiance,
  LevelEnglish,
} from 'src/database/enums';
import { Skill } from './skill.entity';
import { Country } from './country.entity';
import { Category } from './category.entity';

// type EmployerCategory =
//   | 'Service sector'
//   | 'Skilled trades & manufacturing'
//   | 'Sales & procurement'
//   | 'Retail'
//   | 'Hotels, restaurants & tourism'
//   | 'Administration & middle management'
//   | 'It, computers & Internet'
//   | 'Logistics, warehouse & internetional commerce'
//   | 'Transportation & auto industry'
//   | 'Medicine & pharmaceuticals'
//   | 'Marketing, advertising & PR'
//   | 'Accounting & auditing'
//   | 'Secretarial, clerical & administrative assistants'
//   | 'Education & science'
//   | 'Telecommunications'
//   | 'Finance & banking'
//   | 'Construction & architecture'
//   | 'Design & creativity'
//   | 'Beuty, fitness & sports'
//   | 'Journalism, publishing & printing'
//   | 'HR & personnel management'
//   | 'Upper & senior management'
//   | 'Agriculture & agribusiness'
//   | 'Security & guarding'
//   | 'Legal'
//   | 'Real estate'
//   | 'Culture, music & entertainment'
//   | 'Insurance';
@Entity({ name: 'jobs' })
export class Job {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ManyToMany(() => Country)
  @JoinTable()
  countries: Country[];

  @ManyToOne(() => Category, category => category.jobs)
  @JoinColumn()
  category: Category;

  @ApiProperty()
  @Column()
  position: string;

  @ApiProperty()
  @Column()
  employmentType: EmploymentType;

  @ApiProperty()
  @Column()
  hourRate: HourRate;

  @ApiProperty()
  @Column()
  availableAmountOfHours: AvailableAmountOfHours;

  @ApiProperty()
  @Column()
  workExperience: WorkExperiance;

  @ManyToMany(() => Skill)
  @JoinTable()
  skills: Skill[];

  @ApiProperty()
  @Column()
  levelEnglish: LevelEnglish;

  @ApiProperty()
  @Column()
  otherRequirenments: string;
}
