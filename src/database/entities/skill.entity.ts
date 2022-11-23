import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Freelancer } from './freelancer.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'skills' })
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    nullable: false,
    unique: true,
  })
  name: string;

  @ManyToMany(() => Freelancer, (freelancer) => freelancer.skills)
  freelancers: Freelancer[];
}
