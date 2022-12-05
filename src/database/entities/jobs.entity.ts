import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  EmploymentType,
  HourRate,
  AvailableAmountOfHours,
  LevelEnglish,
  WorkExperience,
} from 'src/database/enums';

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
}
