import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Freelancer, Job } from './index';

@Entity({ name: 'countries' })
export class Country {
  @ApiProperty({ example: '986dcaf4-c1ea-4218-b6b4-e4fd95a3c28e' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Ukraine' })
  @Column({
    unique: true,
  })
  name: string;

  @ManyToMany(() => Job, job => job.skills)
  jobs: Job[];

  @OneToMany(() => Freelancer, freelancer => freelancer.country)
  freelancers: Freelancer[];
}
