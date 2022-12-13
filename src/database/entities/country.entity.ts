import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Freelancer } from './freelancer.entity';
import { Job } from './jobs.entity';

@Entity({ name: 'countries' })
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

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
