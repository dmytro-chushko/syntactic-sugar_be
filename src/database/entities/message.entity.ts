import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Chat } from './chat.entity';

@Entity({ name: 'message' })
export class Message {
  @ApiProperty()
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
}
