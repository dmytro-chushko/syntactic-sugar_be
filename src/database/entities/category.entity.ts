import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Freelancer } from './freelancer.entity';
import { Job } from './jobs.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
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
