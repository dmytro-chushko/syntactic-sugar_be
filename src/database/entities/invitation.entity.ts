import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Job } from './jobs.entity';
import { Freelancer } from './freelancer.entity';
import { Employer } from './employer.entity';

@Entity({ name: 'invitations' })
export class Invitation {
  @ApiProperty({ example: '986dcaf4-c1ea-4218-b6b4-e4fd95a3c28e' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: '2f9f5724-a81f-4d80-8571-616e27bff201' })
  @ManyToOne(() => Freelancer, freelancer => freelancer.invitation)
  @JoinTable()
  freelancer: Freelancer;

  @ApiProperty({ example: '2f9f5724-a81f-4d80-8571-616e27bff201' })
  @ManyToOne(() => Job, job => job.invitation)
  @JoinTable()
  job: Job;

  @ApiProperty({ example: '2f9f5724-a81f-4d80-8571-616e27bff201' })
  @ManyToOne(() => Employer, employer => employer.invitations)
  @JoinTable()
  employer: Employer;
}
