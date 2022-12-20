import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Freelancer, Job } from './index';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Embedded systems' })
  @Column({
    nullable: false,
    unique: true,
  })
  name: string;

  @OneToMany(() => Freelancer, freelancer => freelancer.category)
  freelancers: Freelancer[];

  @OneToMany(() => Job, job => job.category)
  jobs: Job[];
}
