import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateOfferlDto {
  @ApiProperty({ example: '500' })
  @IsString()
  hourRate?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  freelancerId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  jobId: string;
}
