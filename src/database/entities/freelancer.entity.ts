import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users.entity';
import { Category } from './category.entity';
import { Skill } from './skill.entity';
import { HourRate } from 'src/database/enums/HourRate';
import { WorkExperience } from 'src/database/enums/WorkExperience';
import { EnglishLevel } from 'src/database/enums/EnglishLevel';
import { AvailableAmountOfHours } from 'src/database/enums/AvailableAmountOfHours';
import { EmploymentType } from 'src/database/enums/EmploymentType';
import { Education } from './education.entity';
import { WorkHistory } from './workHistory.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

@Entity({ name: 'freelancers' })
export class Freelancer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  fullName: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  country: string;

  @ApiProperty()
  @Column({ nullable: false })
  hourRate: HourRate;

  @ApiProperty()
  @Column({ nullable: false })
  position: string;

  @ApiProperty()
  @Column({ nullable: false })
  availableAmountOfHours: AvailableAmountOfHours;

  @ApiProperty()
  @Column({ nullable: false })
  employmentType: EmploymentType;

  @ApiProperty()
  @Column({ nullable: false })
  workExperience: WorkExperience;

  @ApiProperty()
  @Column({ nullable: false })
  englishLevel: EnglishLevel;

  @OneToOne(() => User, user => user.id)
  @JoinColumn()
  user: User;

  @OneToOne(() => Category, category => category.id)
  @JoinColumn()
  category: Category;

  @ManyToMany(() => Skill, skill => skill.freelancers)
  @JoinTable()
  skills: Skill[];

  @ApiProperty({
    description: 'Educations of the freelancer',
    type: [Education],
  })
  @IsOptional()
  @OneToMany(() => Education, education => education.freelancers, {
    cascade: true,
    nullable: true,
  })
  education: Education[];

  @ApiProperty({
    description: 'Work History of the freelancer',
    type: [WorkHistory],
  })
  @IsOptional()
  @OneToMany(() => WorkHistory, workHistory => workHistory.freelancers, {
    cascade: true,
    nullable: true,
  })
  workHistory: WorkHistory[];

  @ApiProperty({
    description: 'Other experiences of the freelancer',
    example: 'Data Analyst at Infra Tech Company',
  })
  @IsOptional()
  @Column()
  otherExperience: string;
}
