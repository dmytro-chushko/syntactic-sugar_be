import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProposalDto {
  @ApiProperty({ example: 1 })
  @IsString()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 'Hello! This is my cover letter!' })
  @IsString()
  @IsNotEmpty()
  coverLetter: string;
}
