import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Employer } from './employer.entity';

@Entity({ name: 'jobs' })
export class Job {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    nullable: false,
  })
  positionForJob: string;

  @Column({ nullable: false })
  description: string;

  @Column({
    default: false,
    nullable: false,
  })
  isPublished: boolean;

  @ManyToOne(() => Employer, employer => employer.jobs)
  employer: Employer;
}
