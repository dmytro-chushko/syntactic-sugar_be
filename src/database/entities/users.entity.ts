import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from 'src/utils/constants';

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
    default: UserRoles.FREELANCER,
  })
  role: UserRoles;

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
}
