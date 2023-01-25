import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatDto {
  @ApiProperty({ example: '2f9f5724-a81f-4d80-8571-616e27bff201' })
  @IsString()
  @IsNotEmpty()
  freelancerId: string;

  @ApiProperty({ example: '2f9f5724-a81f-4d80-8571-616e27bff201' })
  @IsString()
  @IsNotEmpty()
  employerId: string;

  @ApiProperty({ example: '2f9f5724-a81f-4d80-8571-616e27bff201' })
  @IsString()
  @IsNotEmpty()
  jobId: string;
}
