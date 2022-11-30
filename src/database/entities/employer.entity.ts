import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './users.entity';
import { Job } from './job.entity';

@Entity({ name: 'employer' })
export class Employer {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({
    unique: false,
    default: null,
  })
  fullName: string;

  @ApiProperty()
  @Exclude()
  @Column({
    default: null,
  })
  companyName: string;

  @ApiProperty()
  @Column({
    default: null,
  })
  position: string;

  @ApiProperty()
  @Column({
    default: null,
  })
  phone: string;

  @ApiProperty()
  @Column({
    default: null,
  })
  linkedIn: string;

  @ApiProperty()
  @Column({
    default: null,
  })
  website: string;

  @ApiProperty()
  @Column({
    default: null,
  })
  aboutUs: string;

  @OneToOne(() => User, user => user.id)
  @JoinColumn()
  user: User;

  @OneToMany(() => Job, job => job.employer)
  jobs: Job[];
}
