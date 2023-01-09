import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { HourRate } from 'src/database/enums/HourRate';
import { WorkExperience } from 'src/database/enums/WorkExperience';
import { EnglishLevel } from 'src/database/enums/EnglishLevel';
import { AvailableAmountOfHours } from 'src/database/enums/AvailableAmountOfHours';
import { EmploymentType } from 'src/database/enums/EmploymentType';
import { Proposal } from './proposalFreelancer.entity';
import { Country } from './country.entity';
import { User } from './users.entity';
import { Category } from './category.entity';
import { Skill } from './skill.entity';
import { Education } from './education.entity';
import { WorkHistory } from './workHistory.entity';
import { Invitation } from './invitation.entity';

@Entity({ name: 'freelancers' })
export class Freelancer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Elon Mask' })
  @Column({
    nullable: false,
  })
  fullName: string;

  @ApiProperty({ example: 'less 50$' })
  @Column({ nullable: false })
  hourRate: HourRate;

  @ApiProperty({ example: 'Junior IOS dev' })
  @Column({ nullable: false })
  position: string;

  @ApiProperty({ example: 'Full-time' })
  @Column({ nullable: false })
  availableAmountOfHours: AvailableAmountOfHours;

  @ApiProperty({ example: 'remote' })
  @Column({ nullable: false })
  employmentType: EmploymentType;

  @ApiProperty({ example: 'without exp' })
  @Column({ nullable: false })
  workExperience: WorkExperience;

  @ApiProperty({ example: 'Beginner' })
  @Column({ nullable: false })
  englishLevel: EnglishLevel;

  @ApiProperty({ example: '9e58b950-f346-498f-a586-77034553f9b4.jpg' })
  @Column({ nullable: true })
  image: string;

  @ApiProperty()
  @OneToOne(() => User, user => user.id)
  @JoinColumn()
  user: User;

  @ApiProperty()
  @ManyToOne(() => Category, category => category.freelancers)
  category: Category;

  @ApiProperty({ example: 'Ukraine' })
  @ManyToOne(() => Country, country => country.freelancers)
  country: Country;

  @ApiProperty()
  @ManyToMany(() => Skill, skill => skill.freelancers)
  @JoinTable()
  skills: Skill[];

  @ApiProperty({
    description: 'Educations of the freelancer',
    type: [Education],
    example: [
      {
        institute: 'University of Developers',
        occupation: 'FullStack Developer',
        period: '3 years',
      },
    ],
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
    example: [
      {
        company: 'Developers Company',
        workPosition: 'FullStack Developer',
        period: '3 years',
      },
    ],
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
  @Column({
    default: '',
  })
  otherExperience: string;

  @ApiProperty()
  @OneToMany(() => Proposal, proposal => proposal.freelancer)
  proposals: Proposal[];

  @ApiProperty({ example: 'true' })
  @Column({
    default: false,
  })
  isPublished: boolean;

  @ApiProperty()
  @OneToMany(() => Invitation, invitation => invitation.freelancer)
  invitation: Invitation[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
