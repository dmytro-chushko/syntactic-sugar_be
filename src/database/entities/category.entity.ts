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
