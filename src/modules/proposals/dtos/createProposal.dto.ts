import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProposalDto {
  @ApiProperty({ example: 'Hello! This is my cover letter!' })
  @IsString()
  @IsNotEmpty()
  coverLetter: string;
}
