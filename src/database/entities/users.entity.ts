import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Employer } from './employer.entity';

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
    default: '',
  })
  firstName: string;

  @ApiProperty()
  @Column({
    nullable: false,
    default: '',
  })
  lastName: string;

  @ApiProperty()
  @Column({
    nullable: false,
    default: false,
  })
  isActivated: boolean;

  @Column({ default: UserRole.Guest })
  role: UserRole;

  @OneToOne(() => Employer, employer => employer.user)
  femployer: Employer;
}
