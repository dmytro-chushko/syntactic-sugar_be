import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Freelancer } from './freelancer.entity';
import { ApiProperty } from '@nestjs/swagger';

// Will be added after merging Freelancer and Employer entity

// import { Job } from './jobs.entity';

@Entity({ name: 'skills' })
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'C++' })
  @Column({
    nullable: false,
    unique: true,
  })
  name: string;

  @ManyToMany(() => Freelancer, freelancer => freelancer.skills)
  freelancers: Freelancer[];
  // Will be added after merging Freelancer and Employer entity

  // @ManyToMany(() => Job, job => job.skills)
  // jobs: Job[];
}
