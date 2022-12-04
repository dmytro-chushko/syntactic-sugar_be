import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,

  // Will be added after merging Freelancer and Employer entity

  // JoinColumn,
  // JoinTable,
  // ManyToMany,
  // ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  EmploymentType,
  HourRate,
  AvailableAmountOfHours,
  LevelEnglish,
  WorkExperience,
} from 'src/database/enums';
import { Employer } from './employer.entity';

// Will be added after merging Freelancer and Employer entity

// import { Skill } from './skill.entity';
// import { Country } from './country.entity';
// import { Category } from './category.entity';

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

  // Will be added after merging Freelancer and Employer entity

  // @ManyToMany(() => Country)
  // @JoinTable()
  // countries: Country[];

  // @ManyToOne(() => Category, category => category.jobs)

  // @JoinColumn()
  // category: Category;

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
  workExperience: WorkExperience;

  // Will be added after merging Freelancer and Employer entity

  // @ManyToMany(() => Skill)
  // @JoinTable()
  // skills: Skill[];

  @ApiProperty()
  @Column()
  levelEnglish: LevelEnglish;

  @ApiProperty()
  @Column()
  otherRequirements: string;

  @ManyToOne(() => Employer, employer => employer.jobs)
  employer: Employer;
}
