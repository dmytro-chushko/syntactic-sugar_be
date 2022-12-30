import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Freelancer } from 'src/database/entities/freelancer.entity';
import { Job } from 'src/database/entities/jobs.entity';
import { HourRate } from 'src/database/enums';

@Entity({ name: 'proposal_freelancers' })
export class Proposal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Hello! I`m junior fullstack developer and this is my cover letter.' })
  @Column({
    nullable: false,
    length: 1000,
  })
  coverLetter: string;

  @ApiProperty({ example: 'Less 500$' })
  @Column({
    nullable: true,
  })
  hourRate: HourRate;

  @ApiProperty()
  @Column()
  filePath: string;

  @ApiProperty()
  @ManyToOne(() => Freelancer, freelancer => freelancer.proposals)
  @JoinColumn()
  freelancer: Freelancer;

  @ManyToOne(() => Job, job => job.proposals)
  job: Job;
}
