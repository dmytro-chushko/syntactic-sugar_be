import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetChatByIdDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
