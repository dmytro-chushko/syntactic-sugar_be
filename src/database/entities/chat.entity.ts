import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Employer, Freelancer, Job } from '.';
import { Message } from './message.entity';

@Entity({ name: 'chat' })
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Message, message => message.chat)
  messages: Message[];

  @ManyToOne(() => Freelancer, freelancer => freelancer.chats)
  @JoinColumn()
  freelancer: Freelancer;

  @ManyToOne(() => Employer, employer => employer.chats)
  @JoinColumn()
  employer: Employer;

  @ManyToOne(() => Job, job => job.chats)
  @JoinColumn()
  job: Job;
}
