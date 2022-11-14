import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

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
    nullable: false,
  })
  password: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  firstName: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  lastName: string;

  @ApiProperty()
  @Column({
    nullable: false,
    default: false,
  })
  isActivated: boolean;
}
