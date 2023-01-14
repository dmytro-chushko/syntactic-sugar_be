import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  freelancerId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  employerId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  jobId: string;
}
