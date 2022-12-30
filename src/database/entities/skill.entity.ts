import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Freelancer, Job } from './index';

@Entity({ name: 'skills' })
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'C++' })
  @Column({
    nullable: false,
    unique: true,
  })
  name: string;

  @ManyToMany(() => Freelancer, freelancer => freelancer.skills)
  freelancers: Freelancer[];

  @ManyToMany(() => Job, job => job.skills)
  jobs: Job[];
}
