import { Freelancer } from './freelancer.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'work_history' })
export class WorkHistory {
  @ApiProperty({
    description: 'Id Work History',
    example: '986dcaf4-c1ea-4218-b6b4-e4fd95a3c28e',
  })
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({
    description: 'Name of the Company',
    example: 'Developers Company',
  })
  @Column()
  company: string;

  @ApiProperty({
    description: 'Working Position in the Company',
    example: 'FullStack Developer',
  })
  @Column()
  workPosition: string;

  @ApiProperty({
    description: 'Period working in the company',
    example: '3 years',
  })
  @Column()
  period: string;

  @ApiProperty({
    description: 'Freelancer with the Work History',
    type: () => Freelancer,
  })
  @ManyToOne(() => Freelancer, freelancer => freelancer.workHistory, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  freelancers: Freelancer;

  @ApiProperty({
    description: 'Id of freelancer with work history',
    example: '986dcaf4-c1ea-4218-b6b4-e4fd95a3c28e',
  })
  @Column()
  freelancersId: string;
}
