import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Freelancer } from './freelancer.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty()
  @Column({
    nullable: false,
    unique: true,
  })
  name: string;

  @OneToOne(() => Freelancer, (freelancer) => freelancer.category)
  freelancer: Freelancer;
}
