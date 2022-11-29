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
    nullable: true,
    default: UserRoles.GUEST,
  })
  role: UserRoles;

  @ApiProperty()
  @Column({
    nullable: false,
    default: false,
  })
  isActivated: boolean;

  @OneToOne(() => Employer, employer => employer.user)
  femployer: Employer;
}
