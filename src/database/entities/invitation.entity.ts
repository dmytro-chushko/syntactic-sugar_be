import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Job } from './jobs.entity';
import { Freelancer } from './freelancer.entity';
import { Employer } from './employer.entity';

@Entity({ name: 'invitations' })
export class Invitation {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: '2f9f5724-a81f-4d80-8571-616e27bff201' })
  @OneToOne(() => Freelancer, freelancer => freelancer.invitation)
  @JoinColumn()
  freelancer: Freelancer;

  @ApiProperty({ example: '2f9f5724-a81f-4d80-8571-616e27bff201' })
  @ManyToOne(() => Job, job => job.invitation)
  job: Job;

  @ApiProperty()
  @ManyToOne(() => Employer, employer => employer.invitations)
  employer: Employer;
}
