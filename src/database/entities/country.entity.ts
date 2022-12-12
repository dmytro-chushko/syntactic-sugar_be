import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Job } from './jobs.entity';

@Entity({ name: 'countries' })
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    unique: true,
  })
  name: string;

  @ManyToMany(() => Job, job => job.skills)
  jobs: Job[];
}
