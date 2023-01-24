import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetChatByIdDto {
  @ApiProperty({ example: '2f9f5724-a81f-4d80-8571-616e27bff201' })
  @IsString()
  @IsNotEmpty()
  id: string;
}
