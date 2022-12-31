import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProposalDto {
  @ApiProperty({ example: '1' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'Hello! This is my cover letter!' })
  @IsString()
  @IsNotEmpty()
  coverLetter: string;

  @ApiProperty({ example: 500 })
  @IsString()
  hourRate?: string;
}
