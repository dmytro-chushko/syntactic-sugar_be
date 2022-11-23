import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Freelancer } from './freelancer.entity';

export enum UserRole {
  Guest = 'guest',
  Freelancer = 'freelancer',
  Employer = 'employer',
}

@Entity({ name: 'users' })
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @ApiProperty()
  @Exclude()
  @Column({
    nullable: true,
    default: null,
  })
  password: string;

  @ApiProperty()
  @Column({
    nullable: false,
    default: false,
  })
  isActivated: boolean;

  @Column({ default: UserRole.Guest })
  role: UserRole;

  @OneToOne(() => Freelancer, (freelancer) => freelancer.user)
  freelancer: Freelancer;
}
