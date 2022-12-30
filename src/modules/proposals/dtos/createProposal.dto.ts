import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { HourRate } from 'src/database/enums';

export class CreateProposalDto {
  @ApiProperty({ example: 1 })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'Hello! This is my cover letter!' })
  @IsString()
  @IsNotEmpty()
  coverLetter: string;

  @ApiProperty({ example: 'Less than 500$' })
  @IsNotEmpty()
  @IsEnum(HourRate)
  hourRate?: HourRate;
}
