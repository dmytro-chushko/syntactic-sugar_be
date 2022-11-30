import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Freelancer } from './freelancer.entity';
import { ApiProperty } from '@nestjs/swagger';

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
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Will be added after merging Freelancer and Employer entity

// import { Job } from './jobs.entity';

@Entity({ name: 'categories' })
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  name: string;

  // Will be added after merging Freelancer and Employer entity

  // @OneToMany(() => Job, job => job.category)
  // jobs: Job[];
}
