import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
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
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'freelancers' })
export class Freelancer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Elon Mask' })
  @Column({
    nullable: false,
  })
  fullName: string;

  @ApiProperty({ example: 'Ukraine' })
  @Column({
    nullable: false,
  })
  country: string;

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

  @ApiProperty({ example: 'true' })
  @Column({
    default: false,
  })
  isPublished: boolean;

  @ApiProperty()
  @OneToOne(() => User, user => user.id)
  @JoinColumn()
  user: User;

  @ApiProperty()
  @OneToOne(() => Category, category => category.id)
  @JoinColumn()
  category: Category;

  @ApiProperty()
  @ManyToMany(() => Skill, skill => skill.freelancers)
  @JoinTable()
  skills: Skill[];
}
