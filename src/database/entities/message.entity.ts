import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Chat } from './chat.entity';
import { Notification } from './notification.entity';

@Entity({ name: 'message' })
export class Message {
  @ApiProperty({ example: '986dcaf4-c1ea-4218-b6b4-e4fd95a3c28e' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Some_text' })
  @Column()
  text: string;

  @ApiProperty({ example: 'user_id' })
  @Column()
  sender: string;

  @ApiProperty({ example: '10.02.2023' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '10.02.2023' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @ManyToOne(() => Chat, chat => chat.messages)
  chat: Chat;

  @OneToOne(() => Notification, notification => notification.message)
  notification: Notification;
}
