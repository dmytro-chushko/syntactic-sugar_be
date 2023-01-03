import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Freelancer } from './freelancer.entity';

@Entity({ name: 'education' })
export class Education {
  @ApiProperty({
    description: 'Id Education',
    example: '986dcaf4-c1ea-4218-b6b4-e4fd95a3c28e',
  })
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({
    description: 'Name of the Institute',
    example: 'University of Developers',
  })
  @Column()
  institute: string;

  @ApiProperty({
    description: 'Occupation in the Institute',
    example: 'FullStack Developer',
  })
  @Column()
  occupation: string;

  @ApiProperty({
    description: 'Period studying in the Institute',
    example: '3 years',
  })
  @Column()
  period: string;

  @ApiProperty({
    description: 'Freelancer with education',
    type: () => Freelancer,
  })
  @ManyToOne(() => Freelancer, freelancer => freelancer.education, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  freelancers: Freelancer;
}
