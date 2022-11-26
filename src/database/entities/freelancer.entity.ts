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
}
