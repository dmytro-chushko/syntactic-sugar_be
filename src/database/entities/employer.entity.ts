import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './users.entity';
import { Job } from './jobs.entity';
import { Invitation } from './invitation.entity';
import { Chat } from './chat.entity';

@Entity({ name: 'employers' })
export class Employer {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Elon Mask' })
  @Column({
    unique: false,
    default: null,
  })
  fullName: string;

  @ApiProperty({ example: 'Dream company' })
  @Exclude()
  @Column({
    default: null,
  })
  companyName: string;

  @ApiProperty({ example: 'HR' })
  @Column({
    default: null,
  })
  position: string;

  @ApiProperty({ example: '04423576893' })
  @Column({
    default: null,
  })
  phone: string;

  @ApiProperty({ example: 'linkedin.com' })
  @Column({
    default: null,
  })
  linkedIn: string;

  @ApiProperty({ example: 'www.mysite.com' })
  @Column({
    default: null,
  })
  website: string;

  @ApiProperty({ example: 'We provide best business solutions' })
  @Column({
    default: null,
    length: 1000,
  })
  aboutUs: string;

  @ApiProperty({ example: '9e58b950-f346-498f-a586-77034553f9b4.jpg' })
  @Column({ nullable: true })
  image: string;

  @ApiProperty({ example: '2f9f5724-a81f-4d80-8571-616e27bff201' })
  @OneToOne(() => User, user => user.id)
  @JoinColumn()
  user: User;

  @ApiProperty()
  @OneToMany(() => Job, job => job.employer)
  jobs: Job[];

  @ApiProperty()
  @OneToMany(() => Invitation, invitation => invitation.employer)
  invitations: Invitation[];

  @ApiProperty()
  @OneToMany(() => Chat, chat => chat.employer)
  chats: Chat[];
}
