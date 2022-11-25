import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './users.entity';

@Entity({ name: 'employer' })
export class Employer {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({
    unique: false,
    nullable: false,
  })
  fullName: string;

  @ApiProperty()
  @Exclude()
  @Column({
    nullable: false,
  })
  companyName: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  position: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  phone: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  linkedIn: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  website: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  aboutUs: string;

  @OneToOne(() => User, user => user.id)
  @JoinColumn()
  user: User;
}
