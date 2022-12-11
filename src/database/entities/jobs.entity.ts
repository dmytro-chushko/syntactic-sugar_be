import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {
  EmploymentType,
  HourRate,
  AvailableAmountOfHours,
  EnglishLevel,
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

  @ApiProperty({ example: 'Java script developer for a big  educational project' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Any text wich discribes current job' })
  @Column()
  description: string;

  @ApiProperty({ example: 'Fullstack developer' })
  @Column()
  position: string;

  @ApiProperty({ example: 'Remote' })
  @Column()
  employmentType: EmploymentType;

  @ApiProperty({ example: 'Less than 500$' })
  @Column()
  hourRate: HourRate;

  @ApiProperty({ example: 'Part time' })
  @Column()
  availableAmountOfHours: AvailableAmountOfHours;

  @ApiProperty({ example: 'Less than 1 year' })
  @Column()
  workExperience: WorkExperience;

  @ApiProperty({ example: 'Intermediate' })
  @Column()
  englishLevel: EnglishLevel;

  @ApiProperty({ example: 'All the other requirenments of the job' })
  @Column()
  otherRequirenments: string;

  @ApiProperty({ example: 'IT, computers & Internet' })
  @ManyToOne(() => Category, category => category.jobs)
  category: Category;

  @ApiProperty({ example: ['PHP', 'Java'] })
  @ManyToMany(() => Skill, skill => skill.jobs)
  @JoinTable()
  skills: Skill[];

  @ApiProperty({ example: ['Ukraine', 'Germany'] })
  @ManyToMany(() => Country, country => country.jobs)
  @JoinTable()
  countries: Country[];
}
