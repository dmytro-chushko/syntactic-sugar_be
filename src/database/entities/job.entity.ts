import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Employer } from './employer.entity';

@Entity({ name: 'jobs' })
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  positionForJob: string;

  @Column({ nullable: false })
  description: string;

  @ManyToOne(() => Employer, employer => employer.jobs)
  employer: Employer;
}
