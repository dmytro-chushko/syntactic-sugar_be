import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Freelancer } from './freelancer.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Will be added after merging Freelancer and Employer entity

// import { Job } from './jobs.entity';

@Entity({ name: 'skills' })
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'C++' })
  @Column({
    nullable: false,
  @ApiProperty()
  @Column({
    unique: true,
  })
  name: string;

  @ManyToMany(() => Freelancer, freelancer => freelancer.skills)
  freelancers: Freelancer[];
  // Will be added after merging Freelancer and Employer entity

  // @ManyToMany(() => Job, job => job.skills)
  // jobs: Job[];
}
