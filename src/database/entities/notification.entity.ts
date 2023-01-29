import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum } from 'class-validator';
import { NotificationType } from 'src/utils/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Notification {
  @ApiProperty({
    description: 'Id of notification',
    example: '986dcaf4-c1ea-4218-b6b4-e4fd95a3c28e',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Type of notification',
    example: NotificationType.OFFER,
    enum: NotificationType,
  })
  @Column({ type: 'enum', enum: NotificationType })
  @IsEnum(NotificationType)
  type: NotificationType;

  @ApiProperty({
    description: 'Is it new notification',
    example: true,
    default: true,
  })
  @Column({ default: true })
  @IsBoolean()
  isNew: boolean;

  @ApiProperty({
    description: 'Date when notification was created',
    type: Date,
  })
  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Message, message => message.notification)
  @JoinColumn()
  message: Message;
}
