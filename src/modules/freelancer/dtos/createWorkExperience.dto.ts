import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateWorkExperienceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of the Company',
    example: 'Developers Company',
  })
  company: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Working Position in the Company',
    example: 'FullStack Developer',
  })
  workPosition: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Period working in the company',
    example: '3 years',
  })
  period: string;
}
