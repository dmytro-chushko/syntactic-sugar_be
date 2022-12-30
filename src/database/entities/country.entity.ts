import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Freelancer, Job } from '../../../index';

@Entity({ name: 'countries' })
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({
    unique: true,
  })
  name: string;

  @ManyToMany(() => Job, job => job.skills)
  jobs: Job[];

  @OneToMany(() => Freelancer, freelancer => freelancer.country)
  freelancers: Freelancer[];
}
