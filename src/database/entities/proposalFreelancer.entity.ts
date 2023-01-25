import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Freelancer } from 'src/database/entities/freelancer.entity';
import { Job } from 'src/database/entities/jobs.entity';

@Entity({ name: 'proposal_freelancers' })
export class Proposal {
  @ApiProperty({ example: '986dcaf4-c1ea-4218-b6b4-e4fd95a3c28e' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Hello! I`m junior fullstack developer and this is my cover letter.' })
  @Column({
    nullable: false,
    length: 1000,
  })
  coverLetter: string;

  @ApiProperty({ example: '500' })
  @Column({
    nullable: true,
  })
  hourRate: string;

  @ApiProperty({ example: 'img.url' })
  @Column()
  filePath: string;

  @CreateDateColumn()
  createdDate: Date;

  @ApiProperty({ example: '986dcaf4-c1ea-4218-b6b4-e4fd95a3c28e' })
  @ManyToOne(() => Freelancer, freelancer => freelancer.proposals)
  @JoinColumn()
  freelancer: Freelancer;

  @ApiProperty({ example: '986dcaf4-c1ea-4218-b6b4-e4fd95a3c28e' })
  @ManyToOne(() => Job, job => job.proposals)
  job: Job;
}
