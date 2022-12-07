import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {
  EmploymentType,
  HourRate,
  AvailableAmountOfHours,
  LevelEnglish,
  WorkExperience,
} from 'src/database/enums';
import { Category } from './category.entity';
import { Skill } from './skill.entity';
import { Country } from './country.entity';

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

  @ApiProperty()
  @Column()
  levelEnglish: LevelEnglish;

  @ApiProperty()
  @Column()
  otherRequirenments: string;

  @ApiProperty()
  @ManyToOne(() => Category, category => category.jobs)
  category: Category;

  @ApiProperty()
  @ManyToMany(() => Skill, skill => skill.jobs)
  @JoinTable()
  skills: Skill[];

  @ApiProperty()
  @ManyToMany(() => Country, country => country.jobs)
  @JoinTable()
  countries: Country[];
}
