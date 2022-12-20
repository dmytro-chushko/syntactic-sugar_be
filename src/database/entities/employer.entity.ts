import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './users.entity';
import { Job } from './jobs.entity';

@Entity({ name: 'employers' })
export class Employer {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Elon Mask' })
  @Column({
    unique: false,
    default: null,
  })
  fullName: string;

  @ApiProperty({ example: 'Dream company' })
  @Exclude()
  @Column({
    default: null,
  })
  companyName: string;

  @ApiProperty({ example: 'HR' })
  @Column({
    default: null,
  })
  position: string;

  @ApiProperty({ example: '04423576893' })
  @Column({
    default: null,
  })
  phone: string;

  @ApiProperty({ example: 'linkedin.com' })
  @Column({
    default: null,
  })
  linkedIn: string;

  @ApiProperty({ example: 'www.mysite.com' })
  @Column({
    default: null,
  })
  website: string;

  @ApiProperty({ example: 'We provide best business solutions' })
  @Column({
    default: null,
  })
  aboutUs: string;

  @ApiProperty({ example: '9e58b950-f346-498f-a586-77034553f9b4.jpg' })
  @Column({ nullable: true })
  image: string;

  @OneToOne(() => User, user => user.id)
  @JoinColumn()
  user: User;

  @OneToMany(() => Job, job => job.employer)
  jobs: Job[];
}
