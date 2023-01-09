import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';
import { CreateMessageDto } from 'src/modules/message/dto/createMessage.dto';

export class MessageDto extends CreateMessageDto {
  @ApiProperty()
  @IsDateString()
  createdAt: Date;
}
