import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from 'src/utils/constants';
import { Employer } from './employer.entity';

@Entity({ name: 'users' })
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'ElonMask@gmail.com' })
  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @ApiProperty({ example: 'qwertyuiop' })
  @Exclude()
  @Column({
    nullable: true,
    default: null,
  })
  password: string;

  @ApiProperty({ example: 'Employer' })
  @Column({
    nullable: true,
    default: UserRoles.GUEST,
  })
  role: UserRoles;

  @ApiProperty({ example: 0 })
  @Column({
    nullable: false,
    default: true,
  })
  isActivated: boolean;

  @OneToOne(() => Employer, employer => employer.user)
  femployer: Employer;
}
