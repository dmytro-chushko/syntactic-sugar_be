import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ example: 'Hello! Iwant to invite you to the interview.' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ example: '2f9f5724-a81f-4d80-8571-616e27bff201' })
  @IsString()
  @IsNotEmpty()
  sender: string;

  @ApiProperty({ example: '2f9f5724-a81f-4d80-8571-616e27bff201' })
  @IsString()
  @IsNotEmpty()
  chatId: string;
}
