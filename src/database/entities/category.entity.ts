import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Freelancer } from './freelancer.entity';
import { ApiProperty } from '@nestjs/swagger';
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

  @OneToOne(() => Freelancer, freelancer => freelancer.category)
  freelancer: Freelancer;

  @OneToMany(() => Job, job => job.category)
  jobs: Job[];
}
