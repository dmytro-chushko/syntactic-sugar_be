import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Freelancer } from './freelancer.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Job } from './jobs.entity';

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

  @ManyToMany(() => Job, job => job.skills)
  jobs: Job[];
}
