import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Freelancer, Job } from './index';

@Entity({ name: 'skills' })
export class Skill {
  @ApiProperty({ example: '986dcaf4-c1ea-4218-b6b4-e4fd95a3c28e' })
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
