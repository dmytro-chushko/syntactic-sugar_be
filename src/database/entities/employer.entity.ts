import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  // OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './users.entity';

@Entity({ name: 'employer' })
export class Employer {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({
    unique: false,
    nullable: false,
  })
  fullName: string;

  @ApiProperty()
  @Exclude()
  @Column({
    nullable: false,
    default: null,
  })
  companyName: string;

  @ApiProperty()
  @Column({
    nullable: false,
    default: null,
  })
  position: string;

  @ApiProperty()
  @Column({
    nullable: false,
    default: null,
  })
  phone: string;

  @ApiProperty()
  @Column({
    nullable: false,
    default: null,
  })
  linkedIn: string;

  @ApiProperty()
  @Column({
    nullable: false,
    default: null,
  })
  website: string;

  @ApiProperty()
  @Column({
    nullable: false,
    default: null,
  })
  aboutUs: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  // @OneToMany(() => Jobs, (job) => job.employer)
  // jobs: Jobs[]; // here will be Jobs, in Jobs entity add decorator @ManyToOne
}
