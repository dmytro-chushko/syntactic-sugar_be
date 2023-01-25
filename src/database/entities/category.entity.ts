import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Freelancer, Job } from './index';

@Entity({ name: 'categories' })
export class Category {
  @ApiProperty({ example: '986dcaf4-c1ea-4218-b6b4-e4fd95a3c28e' })
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
