import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Freelancer } from 'src/database/entities/freelancer.entity';
import { Job } from 'src/database/entities/jobs.entity';

@Entity({ name: 'offer' })
export class Offer {
  @ApiProperty({ example: '986dcaf4-c1ea-4218-b6b4-e4fd95a3c28e' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: '500' })
  @Column({
    nullable: true,
  })
  hourRate: string;

  @ApiProperty({ example: 0 })
  @Column({
    default: false,
  })
  isAccepted: boolean;

  @ApiProperty({ example: 0 })
  @Column({
    default: false,
  })
  acceptance: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @ApiProperty()
  @ManyToOne(() => Freelancer, freelancer => freelancer.offers)
  freelancer: Freelancer;

  @ApiProperty()
  @ManyToOne(() => Job, job => job.offers)
  job: Job;
}
